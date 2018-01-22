import * as sha1 from 'sha1'
import * as getRawBody from 'raw-body'

import { Filesystem } from '../../filesystem'
import { CacheAdapter } from './CacheAdapter'
import { CacheAdapterType } from '../CacheConfig'

export interface FileCacheAdapterConfig {
    adapter: CacheAdapterType.FILE,
    basePath: string
}

export class FileCacheAdapter implements CacheAdapter {

    constructor(private filesystem: Filesystem) {}

    public async get(key: string): Promise<Buffer> {
        return await getRawBody(await this.filesystem.read(this.getCacheFilePath(key)))
    }

    public async set(key: string, value: string): Promise<void> {
        await this.filesystem.write(this.getCacheFilePath(key), value)
    }

    public async forget(key: string): Promise<void> {
        await this.filesystem.delete(this.getCacheFilePath(key))
    }

    public async flush(): Promise<void> {
        await this.filesystem.deleteDirectory('.')
    }

    public async remember<T>(key: string, seconds: number, callback: () => Promise<T>): Promise<T> {
        if (! await this.filesystem.exists(this.getCacheFilePath(key))) {
            return await this.renewRemember(key, callback)
        }

        const content = (await getRawBody(await this.filesystem.read(this.getCacheFilePath(key)))).toString()
        const timestamp = content.substr(0, 13)

        if (parseInt(timestamp, 10) < Date.now() - (1000 * seconds)) {
            return await this.renewRemember(key, callback)
        }

        return JSON.parse(content.substr(13))
    }

    private async renewRemember<T>(key, callback: () => Promise<T>): Promise<T> {
        const data = await callback()
        await this.filesystem.write(this.getCacheFilePath(key), Date.now() + JSON.stringify(data))
        return data
    }

    private getCacheFilePath(key: string): string {
        return sha1(key)
    }

}
