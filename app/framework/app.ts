import { Application } from '~/framework/foundation'

import { LoggerServiceProvider, LoggerConfig } from './log'
import { MailerServiceProvider, MailerConfig } from './mail'
import { FilesystemServiceProvider, FilesystemConfig } from './filesystem'
import { CacheServiceProvider, CacheConfig } from './cache'

import { config } from './../config'

let instance: Application = null

if (instance === null) {
    instance = new Application(config.app)

    instance.register(new LoggerServiceProvider)
    instance.register(new MailerServiceProvider)
    instance.register(new FilesystemServiceProvider)
    instance.register(new CacheServiceProvider)

    instance.boot()
}

export const app: Application = instance

export interface ApplicationConfig {
    env: string
    url: string
    serverUrl: string
    port: number
    key: string
    basePath: string

    log: LoggerConfig
    mail: MailerConfig
    filesystem: FilesystemConfig
    cache: CacheConfig
}
