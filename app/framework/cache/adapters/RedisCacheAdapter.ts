import * as sha1 from 'sha1'
import * as Redis from 'ioredis'
import { CacheAdapter } from './CacheAdapter'
import { CacheAdapterType } from '../CacheConfig'

export class RedisCacheAdapterConfig {
    public adapter: CacheAdapterType.REDIS
    public host?: string = '127.0.0.1'
    public port?: number = 6379
    public options?: Redis.RedisOptions = {}
}

export class RedisCacheAdapter implements CacheAdapter {

    constructor(private redis: Redis.Redis) {}

    public async get(key: string): Promise<Buffer> {
        const data = await this.redis.get(key)

        return new Buffer(data)
    }

    public async set(key: string, value: string): Promise<void> {
        return await this.redis.set(key, value)
    }

    public async forget(key: string): Promise<void> {
        await this.redis.del(key)
    }

    public async flush(): Promise<void> {
        throw new Error('Not implemented')
    }

    public async remember<T>(key: string, seconds: number, callback: () => Promise<T>): Promise<T> {
        if (! await this.redis.exists(this.getCacheFilePath(key))) {
            return await this.renewRemember(key, callback)
        }

        const content = await this.redis.get(this.getCacheFilePath(key))
        const timestamp = content.substr(0, 13)

        if (parseInt(timestamp, 10) < Date.now() - (1000 * seconds)) {
            return await this.renewRemember(key, callback)
        }

        return JSON.parse(content.substr(13))
    }

    private async renewRemember<T>(key, callback: () => Promise<T>): Promise<T> {
        const data = await callback()
        await this.redis.set(this.getCacheFilePath(key), Date.now() + JSON.stringify(data))
        return data
    }

    private getCacheFilePath(key: string): string {
        return sha1(key)
    }

}
