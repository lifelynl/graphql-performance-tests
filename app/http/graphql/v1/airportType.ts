import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql'

import { flightType } from './flightType'

import { getFlightRepository } from '~/repositories/FlightRepository'

export const airportType = new GraphQLObjectType({
    name: 'Airport',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        incomingFlights: {
            type: new GraphQLList(flightType),
            resolve: airport => {
                return airport.incomingFlights
                    || getFlightRepository().find({ destinationAirport: airport.id })
            }
        },
        outgoingFlights: {
            type: new GraphQLList(flightType),
            resolve: airport => {
                return airport.outgoingFlights
                    || getFlightRepository().find({ sourceAirport: airport.id })
            }
        }
    })
})
