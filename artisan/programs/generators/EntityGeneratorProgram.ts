import chalk from 'chalk'
import * as path from 'path'
import * as inquirer from 'inquirer'
import { outdent } from 'outdent'
import { startCase, snakeCase } from 'lodash'

import { app, log, filesystem } from '~/framework'
import { Program } from './../../Program'

export class EntityGeneratorProgram extends Program {

    public command = 'make:entity <name>'
    public description = 'Create a new entity'

    public async run(name: string) {
        const cased = startCase(name).replace(' ', '')

        const entityFilename = path.join(app.basePath, '..', `app/entities/${cased}.ts`)
        const repositoryFilename = path.join(app.basePath, '..', `app/repositories/${cased}Repository.ts`)
        const repositoryQueryFilename = path.join(app.basePath, '..', `app/repositories/queries/${cased}Query.ts`)

        const options = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'files',
                message: 'Which files do you want me to create?',
                choices: [
                    { name: `Entity ${chalk.gray(`app/entities/${cased}.ts`)}`, value: 'entity' },
                    { name: `Repository ${chalk.gray(`app/repositories/${cased}Repository.ts`)}`, value: 'repository' }
                ]
            }
        ])

        // Entity file already exists, back off
        if (options.files.includes('entity') && await filesystem('local').exists(entityFilename)) {
            return log().error(`Entity already exists`, { file: entityFilename })
        }

        if (options.files.includes('repository')) {
            // Repository file already exists, back off
            if (await filesystem('local').exists(repositoryFilename)) {
                return log().error(`Repository already exists`, { file: repositoryFilename })
            }

            // Query file already exists, back off
            if (await filesystem('local').exists(repositoryQueryFilename)) {
                return log().error(`Query already exists`, { file: repositoryQueryFilename })
            }
        }

        // Create the entity
        if (options.files.includes('entity')) {
            await filesystem('local').write(entityFilename, entityStub(cased))
            log().debug('Created entity', { file: entityFilename })
        }

        // Create the repository and append to the index.ts file
        if (options.files.includes('repository')) {
            await filesystem('local').write(repositoryFilename, repositoryStub(cased))
            log().debug('Created repository', { file: repositoryFilename })

            await filesystem('local').write(repositoryQueryFilename, repositoryQueryStub(cased))
            log().debug('Created query', { file: repositoryQueryFilename })
        }
    }

}

const entityStub = name => outdent`
import { Entity, Column } from 'typeorm'

import { BaseEntity } from './BaseEntity'

@Entity()
export class ${name} extends BaseEntity {

    @Column()
    public name: string

}

`

const repositoryStub = name => outdent`
import { EntityRepository, getCustomRepository } from 'typeorm'

import { ${name} } from '~/entities/${name}'

import { BaseRepository } from './BaseRepository'
import { ${name}Query } from './queries/${name}Query'

export const get${name}Repository = () => getCustomRepository(${name}Repository)
export const get${name}Query = () => new ${name}Query(get${name}Repository())

@EntityRepository(${name})
export class ${name}Repository extends BaseRepository<${name}> {

    /**
     * Find one ${name} by name
     */
    public findByName(name: string): Promise<${name}> {
        return this.findOne({ name })
    }

}

`

const repositoryQueryStub = name => outdent`
import { ${name} } from '~/entities/${name}'

import { Query } from './Query'

export interface ${name}Filters {
    name?: string
}

export class ${name}Query extends Query<${name}> {

    public filter(filters: ${name}Filters): this {
        const { name } = filters

        if (name) {
            this.andWhere('LOWER(${snakeCase(name)}.name) = LOWER(:name)', { name })
        }

        return this
    }

}

`
