import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql'

import { flightType } from './flightType'

export const passengerType = new GraphQLObjectType({
    name: 'Passenger',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        flights: {
            type: new GraphQLList(flightType)
        }
    })
})
