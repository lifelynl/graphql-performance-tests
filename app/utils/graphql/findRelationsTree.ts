import { camelCase } from 'lodash'
import { GraphQLResolveInfo } from 'graphql'
import { EntityMetadata } from 'typeorm/metadata/EntityMetadata'

import { getFieldNames } from '~/utils/graphql/getFieldNames'

export interface RelationsTree {
    name: string
    relations: RelationsTree[]
}

export interface FindRelationsTreeOptions {
    skip?: string
}

export const findRelationsTree = (
    meta: EntityMetadata,
    info: GraphQLResolveInfo,
    options: FindRelationsTreeOptions
): RelationsTree => {
    let fields = getFieldNames(info)

    if (options.skip) {
        fields = removePrefixFromFields(options.skip, fields)
    }

    return {
        name: camelCase(meta.name),
        relations: findRelationsLeafs(meta, fields)
    }
}

const findRelationsLeafs = (meta: EntityMetadata, fields: string[], prefix: string = ''): RelationsTree[] => {
    const selectedRelations = meta.relations.filter(relation => fields.some(field =>
                                field.startsWith(prefix ? `${prefix}.${relation.propertyName}` : relation.propertyName)))

    const results = []

    for (const selectedRelation of selectedRelations) {
        const name = selectedRelation.propertyName
        const relationPrefix = prefix ? `${prefix}.${name}` : name

        results.push({
            name,
            relations: findRelationsLeafs(selectedRelation.inverseEntityMetadata, fields, relationPrefix)
        })
    }

    return results
}

const removePrefixFromFields = (prefix: string, fields: string[]) => {
    return fields.map(field => {
        if (field.startsWith(prefix)) {
            return field.replace(`${prefix}.`, '')
        }

        return field
    }).filter(field => field)
}
