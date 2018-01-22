import { Readable } from 'stream'

export interface FilesystemAdapter {

    read(filePath: string): Promise<Readable>

    write(filePath: string, readStream: Buffer): Promise<void>
    write(filePath: string, readStream: string): Promise<void>
    write(filePath: string, readStream: Readable): Promise<void>

    append(filePath: string, readStream: Buffer): Promise<void>
    append(filePath: string, readStream: string): Promise<void>
    append(filePath: string, readStream: Readable): Promise<void>

    isFile(filePath: string): Promise<boolean>
    isDirectory(filePath: string): Promise<boolean>

    exists(filePath: string): Promise<boolean>
    delete(filePath: string): Promise<void>
    deleteDirectory(filePath: string): Promise<void>
    url(filePath: string): Promise<string>
    mime(filePath: string): Promise<string>
    extension(filePath: string): Promise<string>

}
