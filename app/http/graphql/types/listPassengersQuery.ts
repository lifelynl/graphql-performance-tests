import { GraphQLList } from 'graphql'

import { passengerType } from './passengerType'
import { getPassengerQuery } from '~/repositories/PassengerRepository'

export const listPassengersQuery = {
    type: new GraphQLList(passengerType),
    resolve: (_, args, context, info) => {
        return getPassengerQuery()
            .joinFromGraphQLInfo(info)
            .getMany()
    }
}
