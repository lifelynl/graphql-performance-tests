import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
} from 'graphql'

export const airportType = new GraphQLObjectType({
    name: 'Airport',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
})
