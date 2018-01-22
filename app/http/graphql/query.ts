import { GraphQLObjectType } from 'graphql'

import { listFlightsQuery } from './v1/listFlightsQuery'
import { listAirportsQuery } from './v1/listAirportsQuery'
import { listPassengersQuery } from './v1/listPassengersQuery'

export const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        airports: listAirportsQuery,
        flights: listFlightsQuery,
        passengers: listPassengersQuery,
    })
})
