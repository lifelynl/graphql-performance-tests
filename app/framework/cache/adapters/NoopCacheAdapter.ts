import { CacheAdapter } from './CacheAdapter'
import { CacheAdapterType } from '../CacheConfig'

export interface NoopCacheAdapterConfig {
    adapter: CacheAdapterType.NOOP
}

export class NoopCacheAdapter implements CacheAdapter {

    public async get(key: string): Promise<Buffer> {
        return undefined
    }

    public async set(key: string, value: string): Promise<void> {
        // no-op
    }

    public async forget(key: string): Promise<void> {
        // no-op
    }

    public async flush(): Promise<void> {
        // no-op
    }

    public async remember<T>(key: string, seconds: number, callback: () => Promise<T>): Promise<T> {
        return callback()
    }

}
