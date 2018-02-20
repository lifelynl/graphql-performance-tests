import yup from 'yup'

import { ValidationError } from 'app/http/graphql/errors/ValidationError'

interface ValidationOptions {
    abortEarly: boolean
}

const formatError = error => {
    return {
        path: error.path,
        type: error.type || error.message,
        args: error.params || {},
    }
}

// This is a hack to transfer the appropriate validation key to the frontend

const locale = require('yup/lib/locale')

locale.mixed.default = 'invalid'
locale.mixed.required = 'required'
locale.string.length = 'length'
locale.string.min = 'min'
locale.string.max = 'max'
locale.string.matches = 'matches'
locale.string.email = 'email'
locale.string.image = 'image'
locale.string.url = 'url'
locale.string.trim = 'trim'
locale.string.lowercase = 'lowercase'
locale.string.uppercase = 'uppercase'
locale.number.min = 'min'
locale.number.max = 'max'
locale.number.positive = 'positive'
locale.number.negative = 'negative'
locale.number.integer = 'integer'

yup.addMethod(yup.string, 'image', function(ref, message) {
    // tslint:disable-next-line:no-invalid-this
    return this.test('image', message, (value: string) => {
        const matchRegEx = new RegExp(/image\/.*/i)
        return matchRegEx.test(value)
    })
})

yup.addMethod(yup.string, 'csv', function(ref, message) {
    // tslint:disable-next-line:no-invalid-this
    return this.test('csv', message, (value: string) => {
        return value === 'text/csv'
    })
})

yup.addMethod(yup.string, 'pdf', function(ref, message) {
    // tslint:disable-next-line:no-invalid-this
    return this.test('pdf', message, (value: string) => {
        return value === 'application/pdf'
    })
})

//   date:
//    { min: '${path} field must be later than ${min}',
//      max: '${path} field must be at earlier than ${max}' },
//   boolean: {},
//   object:
//    { noUnknown: '${path} field cannot have keys not specified in the object shape' },
//   array:
//    { min: '${path} field must have at least ${min} items',
//      max: '${path} field must have less than ${max} items' },
//   default:
//    { mixed:
//       { default: '${path} is invalid',
//         required: '${path} is a required field',
//         oneOf: '${path} must be one of the following values: ${values}',
//         notOneOf: '${path} must not be one of the following values: ${values}',
//         notType: [Function: notType] },
//      string:
//       { length: '${path} must be exactly ${length} characters',
//         min: '${path} must be at least ${min} characters',
//         max: '${path} must be at most ${max} characters',
//         matches: '${path} must match the following: "${regex}"',
//         email: '${path} must be a valid email',
//         url: '${path} must be a valid URL',
//         trim: '${path} must be a trimmed string',
//         lowercase: '${path} must be a lowercase string',
//         uppercase: '${path} must be a upper case string' },
//      number:
//       { min: '${path} must be greater than or equal to ${min}',
//         max: '${path} must be less than or equal to ${max}',
//         positive: '${path} must be a positive number',
//         negative: '${path} must be a negative number',
//         integer: '${path} must be an integer' },
//      date:
//       { min: '${path} field must be later than ${min}',
//         max: '${path} field must be at earlier than ${max}' },
//      object:
//       { noUnknown: '${path} field cannot have keys not specified in the object shape' },
//      array:
//       { min: '${path} field must have at least ${min} items',
//         max: '${path} field must have less than ${max} items' },
//      boolean: {} } }

/**
 * Validates an args object.
 *
 * @param getSchema Callback for providing the validation schema.
 * @param args The arguments to validate.
 * @param options Validation options.
 *
 * @throws Throws a ValidationError with the errored field. Or when abortEarly is false
 *         all the errored arg fields.
 */
export const validateArgs = async (
    getSchema: (object) => object,
    args: any, options?: ValidationOptions
) => {
    options = {
        abortEarly: false,
        ...options,
    }

    const schema = yup.object().shape(getSchema(yup))

    try {
        await schema.validate(args, options)
    } catch (error) {
        const erroredFields = (options && !options.abortEarly)
            ? error.inner.map(formatError)
            : [ formatError(error) ]

        throw new ValidationError(error.message, erroredFields)
    }
// tslint:disable-next-line:ter-indent
}
