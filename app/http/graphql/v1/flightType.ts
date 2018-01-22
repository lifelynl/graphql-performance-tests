import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql'

import { log } from '~/framework'

import { airportType } from './airportType'
import { getAirportQuery } from '~/repositories/AirportRepository'

import { passengerType } from './passengerType'
import { getPassengerQuery } from '~/repositories/PassengerRepository'

import { Context } from '~/http/routes/graphQLHandler'

export const flightType = new GraphQLObjectType({
    name: 'Flight',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        passengers: {
            type: new GraphQLList(passengerType),
            resolve: flight => {
                return getPassengerQuery()
                    .leftJoinAndSelect('passenger.flights', 'flight')
                    .where('flight.id = :id', { id: flight.id })
                    .getMany()
            }
        },
        sourceAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return context.airports.load(flight.sourceAirportId)
                // return getAirportQuery().where('airport.id = :id', { id: flight.sourceAirportId }).getOne()
            }
        },
        destinationAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return context.airports.load(flight.destinationAirportId)
                // return getAirportQuery().where('airport.id = :id', { id: flight.destinationAirport }).getOne()
            }
        }
    })
})
