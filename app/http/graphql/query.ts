import { GraphQLObjectType } from 'graphql'

import {
    listFlightsQuery,
    listFlightsQueryV1,
    listFlightsQueryV2,
    listFlightsQueryV3,
} from './types/listFlightsQuery'

import { listPassengersQuery } from './types/listPassengersQuery'

export const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        passengers: listPassengersQuery,
        flights: listFlightsQuery,
        flightsV1: listFlightsQueryV1,
        flightsV2: listFlightsQueryV2,
        flightsV3: listFlightsQueryV3,
    })
})
