import {
    GraphQLObjectType, GraphQLInputObjectType, GraphQLString
} from 'graphql'

import { Passenger } from '../../../entities/Passenger'
import { getPassengerRepository } from '../../../repositories/PassengerRepository'

import { passengerType } from '../../../http/graphql/types/passengerType'

export const passengerInputType = new GraphQLInputObjectType({
    name: 'AddPassengerMutationInputType',
    fields: () => ({
        name: { type: GraphQLString }
    }),
})

export const addPassengerMutation = {
    type: new GraphQLObjectType({
        name: 'AddUserMutationResponse',
        fields: () => ({
            passenger: { type: passengerType },
        }),
    }),
    args: {
        passenger: { type: passengerInputType },
    },
    async resolve(_, args, context) {

        console.log(args);
        const { passenger: data } = args
        const passenger = await Passenger.newPassenger(data)

        return {
            passenger: await getPassengerRepository().save(passenger),
        }
    },
}
