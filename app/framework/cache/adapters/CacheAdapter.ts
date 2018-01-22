export interface CacheAdapter {

    get(key: string): Promise<Buffer>
    set(key: string, value: string): Promise<void>
    forget(key: string): Promise<void>
    flush(): Promise<void>

    remember<T>(key: string, seconds: number, data: () => Promise<T>): Promise<T>

}
