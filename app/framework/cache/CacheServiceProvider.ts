import * as Redis from 'ioredis'
import { Application, ServiceProvider } from '~/framework/foundation'
import { Filesystem, FilesystemAdapterType } from '~/framework/filesystem'
import { LocalFilesystemAdapter } from '~/framework/filesystem/adapters/LocalFilesystemAdapter'

import { Cache } from './Cache'
import { CacheAdapterType, CacheAdapterConfig } from './CacheConfig'

import { CacheAdapter } from './adapters/CacheAdapter'
import { NoopCacheAdapter } from './adapters/NoopCacheAdapter'
import { FileCacheAdapter } from './adapters/FileCacheAdapter'
import { RedisCacheAdapter } from './adapters/RedisCacheAdapter'

export class CacheServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        const drivers = app.config.cache.drivers

        for (const driver in drivers) {
            if (drivers.hasOwnProperty(driver)) {
                app.singleton<Cache>(`cache.${driver}`, app => {
                    const driverConfig = drivers[driver]
                    const adapter = this.getAdapter(app, driverConfig)

                    return new Cache(adapter)
                })
            }
        }
    }

    public getAdapter(app: Application, config: CacheAdapterConfig): CacheAdapter {
        switch (config.adapter) {
            case CacheAdapterType.NOOP: return new NoopCacheAdapter()
            case CacheAdapterType.FILE: return new FileCacheAdapter(
                new Filesystem(new LocalFilesystemAdapter({ adapter: FilesystemAdapterType.LOCAL, basePath: config.basePath }))
            )
            case CacheAdapterType.REDIS: return new RedisCacheAdapter(
                new Redis(config.port, config.host)
            )
        }
    }

}
