import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql'

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
        departureAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return getAirportQuery().where('airport.id = :id', { id: flight.departureAirportId }).getOne()
            }
        },
        arrivalAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return getAirportQuery().where('airport.id = :id', { id: flight.arrivalAirportId }).getOne()
            }
        }
    })
})

export const flightTypeV2 = new GraphQLObjectType({
    name: 'FlightV2',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        departureAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return context.airports.load(flight.departureAirportId)
            }
        },
        arrivalAirport: {
            type: airportType,
            resolve: (flight, args, context: Context) => {
                return context.airports.load(flight.arrivalAirportId)
            }
        }
    })
})

export const flightTypeV3 = new GraphQLObjectType({
    name: 'FlightV3',
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
        departureAirport: { type: airportType },
        arrivalAirport: { type: airportType },
    })
})
