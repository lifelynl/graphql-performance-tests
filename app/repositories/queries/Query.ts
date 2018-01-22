import { snakeCase } from 'lodash'
import { GraphQLResolveInfo } from 'graphql'
import { SelectQueryBuilder, Repository, Connection, QueryRunner } from 'typeorm'

import { log } from '~/framework'
import { RelationsTree, findRelationsTree } from '~/utils/graphql/findRelationsTree'

export interface GraphQLInfoOptions {
    skip?: string
}

export abstract class Query<Entity> extends SelectQueryBuilder<Entity> {

    protected repository: Repository<Entity>

    constructor(
        repository: Repository<Entity>,
        queryBuilder?: SelectQueryBuilder<Entity> | Connection,
        queryRunner?: QueryRunner
    ) {
        if (queryRunner) {
            super(queryBuilder as Connection, queryRunner)
        } else if (queryBuilder) {
            super(queryBuilder as SelectQueryBuilder<Entity>)
        } else {
            super(repository.createQueryBuilder(snakeCase(repository.metadata.name)))
        }

        this.repository = repository
    }

    public static new<Entity, EntityQuery>(repository: Repository<Entity>): EntityQuery {
        const queryBuilder = repository.createQueryBuilder(snakeCase(repository.metadata.name))
        return new (this.constructor as any)(queryBuilder)
    }

    public joinFromGraphQLInfo(info: GraphQLResolveInfo, options: GraphQLInfoOptions = {}): this {
        const tree = findRelationsTree(this.repository.metadata, info, options)

        log().debug('Joining relations that were computed from the GraphQL AST', tree)

        return this.loadRelationsTree(tree, tree.name)
    }

    public leftJoinIfNeeded(property: string): this {
        if (! this.expressionMap.joinAttributes.some(join => join.entityOrProperty === property)) {
            this.leftJoinAndSelect(property, property.replace('.', '_'))
        }

        return this
    }

    public filterBy(subQueryFactory: (subQuery: Query<Entity>) => void, field: string = 'id'): this {
        const qb = new (this.constructor as any)(this.repository)

        qb.expressionMap.subquery = true
        qb.expressionMap.parentQueryBuilder = this

        subQueryFactory(qb)

        qb.select(`${qb.alias}.${field}`)

        this.andWhere(`${qb.alias}.${field} IN (${qb.getQuery()})`)
        this.setParameters(qb.getParameters())

        return this
    }

    public subQuery(): this {
        const qb = this.createQueryBuilder()
        qb.expressionMap.subQuery = true
        qb.expressionMap.parentQueryBuilder = this
        return qb
    }

    public createQueryBuilder(): this {
        return new (this.constructor as any)(this.repository, this.connection, this.queryRunner)
    }

    public clone(): this {
        return new (this.constructor as any)(this.repository, this)
    }

    private loadRelationsTree(child: RelationsTree, ancestor: string): this {
        child.relations.forEach(relation => {
            const alias = `${ancestor}_${relation.name}`

            this.leftJoinAndSelect(`${ancestor}.${relation.name}`, alias)
            this.loadRelationsTree(relation, alias)
        })

        return this
    }

}
