import {
    GraphQLFieldConfig,
    GraphQLOutputType,
    GraphQLFieldConfigArgumentMap,
    GraphQLResolveInfo,
    FieldDefinitionNode,
} from 'graphql'

import { Context } from 'app/http/routes/graphQLHandler'

interface ArgumentsMap { [argName: string]: any }

type GraphQLFieldResolver<Source, Args, Context, ResolveResponse> = (
    source: Source,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
) => Promise<ResolveResponse>

export interface FieldConfig<
    Args = ArgumentsMap,
    ResolveResponse = any,
    Source = any
> extends GraphQLFieldConfig<Source, Context>{
    type: GraphQLOutputType
    args?: GraphQLFieldConfigArgumentMap
    resolve?: GraphQLFieldResolver<Source, Args, Context, ResolveResponse>
    subscribe?: GraphQLFieldResolver<Source, Args, Context, ResolveResponse>
    deprecationReason?: string
    description?: string
    astNode?: FieldDefinitionNode
}

export const makeGraphQLField = <
    Args = ArgumentsMap,
    ResolveResponse = any,
    Source = any
>(fieldSchema: FieldConfig<Args, ResolveResponse, Source>) => {
    return fieldSchema
}
