import { GraphQLList } from 'graphql'

import { flightType } from './flightType'
import { getFlightRepository } from '~/repositories/FlightRepository'

export const listFlightsQuery = {
    type: new GraphQLList(flightType),
    resolve: (_, args, context, info) => {
        return getFlightRepository().find()
    }
}
