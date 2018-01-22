import { get } from 'lodash'

export function env(key: string, defaultValue?: any) {
    return get(process.env, key, defaultValue)
}
