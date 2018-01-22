import { GraphQLList } from 'graphql'

import { airportType } from './airportType'
import { getAirportRepository } from '~/repositories/AirportRepository'

export const listAirportsQuery = {
    type: new GraphQLList(airportType),
    resolve: (_, args, context, info) => {
        return getAirportRepository().find()
    }
}
