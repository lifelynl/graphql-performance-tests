import * as path from 'path'
import { config as initializeDotenv } from 'dotenv'

import { env } from '~/framework/foundation'
import { ApplicationConfig } from '~/framework/app'
import { MailerAdapterType } from '~/framework/mail'
import { FilesystemAdapterType } from '~/framework/filesystem'
import { LoggerAdapterType, LoggerLevel } from '~/framework/log'
import { CacheAdapterType } from '~/framework/cache'

initializeDotenv()

interface Config {
    auth: {
        sessionLength: number
        resetTokenExpireLength: number
    }
    sentry: {
        dsn: string
    },
    cors: {
        allowedOrigins: (string | RegExp)[]
    }
    apolloEngineKey?: string
    app: ApplicationConfig
}

export const config = <Config> {
    auth: {
        sessionLength: parseInt(env('SESSION_LENGTH', 7200), 10),
        resetTokenExpireLength: parseInt(env('RESET_TOKEN_EXPIRE_LENGTH', 7200), 10)
    },

    sentry: {
        dsn: env('SENTRY_DSN'),
    },

    cors: {
        allowedOrigins: [ `${env('APP_URL')}` ]
    },

    app: {
        env: env('ENV', 'development'),
        url: env('APP_URL', 'http://localhost:3000'),
        serverUrl: env('APP_SERVER_URL', 'http://localhost:5000'),
        port: env('PORT', 5000),
        key: env('SECRET', 'this-is-not-a-secret'),
        basePath: path.join(__dirname, '..'),

        log: {
            default: env('LOG', 'console'),

            adapters: {
                console: {
                    adapter: LoggerAdapterType.CONSOLE,
                    level: env('LOG_LEVEL', LoggerLevel.DEBUG)
                },
            }
        },

        filesystem: {
            driver: env('FILESYSTEM', 'local'),

            drivers: {
                local: {
                    adapter: FilesystemAdapterType.LOCAL,
                    basePath: path.join(__dirname, '..', 'storage/uploads'),
                    baseUrl: env('FILESYSTEM_LOCAL_BASE_URL', 'http://localhost:5000/uploads/')
                },

                s3: {
                    adapter: FilesystemAdapterType.S3,
                    bucket: env('FILESYSTEM_S3_BUCKET_NAME'),
                    region: env('FILESYSTEM_S3_REGION'),
                    accessKeyId: env('FILESYSTEM_S3_ACCESS_KEY_ID'),
                    secretAccessKey: env('FILESYSTEM_S3_SECRET_ACCESS_KEY'),
                    basePath: 'public'
                }
            }
        },

        mail: {
            defaults: {
                fromName: 'Wereldhave',
                fromEmail: 'noreply@wereldhave.com'
            },

            driver: env('MAIL', 'dummy'),

            drivers: {
                dummy: {
                    adapter: MailerAdapterType.DUMMY
                },

                smtp: {
                    adapter: MailerAdapterType.SMTP,
                    host: env('MAIL_SMTP_HOST', 'smtp.mailtrap.io'),
                    port: env('MAIL_SMTP_PORT', 2525),
                    secure: false,
                    auth: {
                        username: env('MAIL_SMTP_AUTH_USERNAME'),
                        password: env('MAIL_SMTP_AUTH_PASSWORD'),
                    }
                }
            }
        },

        cache: {
            driver: env('CACHE', 'file'),

            drivers: {
                noop: {
                    adapter: CacheAdapterType.NOOP
                },

                file: {
                    adapter: CacheAdapterType.FILE,
                    basePath: 'storage/cache'
                },

                redis: {
                    adapter: CacheAdapterType.REDIS
                },
            }
        }
    }
}
