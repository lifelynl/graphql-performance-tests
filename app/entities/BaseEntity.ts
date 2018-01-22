import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity<Schema = {}> {

    @PrimaryGeneratedColumn()
    public id: number

    @CreateDateColumn()
    public createdAt: Date

    @UpdateDateColumn()
    public updatedAt: Date

    constructor(schema?: Schema) {
        if (schema) {
            Object.keys(schema).forEach(attribute => {
                if (schema.hasOwnProperty(attribute)) {
                    this[attribute] = schema[attribute]
                }
            })
        }
    }
}
