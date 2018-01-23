import { GraphQLObjectType } from 'graphql'

import {
    listFlightsQuery,
    listFlightsQueryV2,
    listFlightsQueryV3,
} from './types/listFlightsQuery'

export const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        flightsV1: listFlightsQuery,
        flightsV2: listFlightsQueryV2,
        flightsV3: listFlightsQueryV3,
    })
})
