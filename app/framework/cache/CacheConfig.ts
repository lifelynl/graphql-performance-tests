import { FileCacheAdapterConfig } from './adapters/FileCacheAdapter'
import { NoopCacheAdapterConfig } from './adapters/NoopCacheAdapter'
import { RedisCacheAdapterConfig } from './adapters/RedisCacheAdapter'

export enum CacheAdapterType {
    NOOP = 'noop',
    FILE = 'file',
    REDIS = 'redis'
}

export type CacheAdapterConfig =
    NoopCacheAdapterConfig |
    FileCacheAdapterConfig |
    RedisCacheAdapterConfig

export class CacheConfig {
    public driver: string
    public drivers: {
        [s: string]: CacheAdapterConfig
    }
}
