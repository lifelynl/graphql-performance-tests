import { GraphQLObjectType } from 'graphql'

import { addPassengerMutation } from './passenger/addPassengerMutation'

export const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        addPassenger: addPassengerMutation,
    })
});
