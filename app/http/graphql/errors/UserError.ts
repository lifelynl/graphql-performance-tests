import { GraphQLError } from 'graphql'

export interface ErroredField {
    path: string,
    error: string,
    type: string
}

export class UserError extends GraphQLError {

    public readonly type: string = 'UserError'

    public args: Array<object> = []

    constructor(message: string, args: Array<ErroredField> = []) {
        super(message)

        this.args = args
    }

}
