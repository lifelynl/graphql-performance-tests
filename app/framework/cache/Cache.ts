import { CacheAdapter } from './adapters/CacheAdapter'

export class Cache implements CacheAdapter {

    constructor(
        private adapter: CacheAdapter
    ) {}

    public async get(key: string): Promise<Buffer> {
        return this.adapter.get(key)
    }

    public async set(key: string, content: string): Promise<void> {
        await this.adapter.set(key, content)
    }

    public async forget(key: string): Promise<void> {
        await this.adapter.forget(key)
    }

    public async flush(): Promise<void> {
        await this.adapter.flush()
    }

    public async remember<T>(key: string, seconds: number, callback: () => Promise<T>): Promise<T> {
        return this.adapter.remember<T>(key, seconds, callback)
    }

}
