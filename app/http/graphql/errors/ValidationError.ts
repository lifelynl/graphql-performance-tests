import { UserError } from './UserError'

export class ValidationError extends UserError {
    public readonly type: string = 'ValidationError'
}
