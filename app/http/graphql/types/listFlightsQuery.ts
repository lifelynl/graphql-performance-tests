import * as figlet from 'figlet'

import { GraphQLList } from 'graphql'

import { flightType, flightTypeV2, flightTypeV3 } from './flightType'
import { getFlightQuery } from '~/repositories/FlightRepository'

export const listFlightsQuery = {
    type: new GraphQLList(flightType),
    resolve: (_, args, context, info) => {
        console.log(figlet.textSync('V1 - No optimisations'))
        console.log('')

        return getFlightQuery().getMany()
    }
}

export const listFlightsQueryV2 = {
    type: new GraphQLList(flightTypeV2),
    resolve: (_, args, context, info) => {
        console.log(figlet.textSync('V2 - Using Dataloaders'))
        console.log('')

        return getFlightQuery().getMany()
    }
}

export const listFlightsQueryV3 = {
    type: new GraphQLList(flightTypeV3),
    resolve: (_, args, context, info) => {
        console.log(figlet.textSync('V3 - Joins based on AST'))
        console.log('')

        return getFlightQuery()
            .joinFromGraphQLInfo(info)
            .getMany()
    }
}
