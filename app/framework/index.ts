import { Cache } from './cache'
import { Filesystem } from './filesystem'
import { Logger } from './log'
import { Mailer } from './mail'

import { app as application } from './app'

export const app = application
export const log = () => app.make<Logger>('log')
export const mailer = () => app.make<Mailer>('mailer')
export const filesystem = (driver?: string) => app.make<Filesystem>(`filesystem.${driver ? driver : app.config.filesystem.driver}`)
export const cache = (driver?: string) => app.make<Cache>(`cache.${driver ? driver : app.config.cache.driver}`)
