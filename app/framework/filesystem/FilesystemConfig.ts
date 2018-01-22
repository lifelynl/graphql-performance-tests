import { LocalFilesystemAdapterConfig } from './adapters/LocalFilesystemAdapter'
import { S3FilesystemAdapterConfig } from './adapters/S3FilesystemAdapter'

export enum FilesystemAdapterType {
    LOCAL = 'local',
    S3 = 's3'
}

export type FilesystemAdapterConfig =
    LocalFilesystemAdapterConfig |
    S3FilesystemAdapterConfig

export class FilesystemConfig {
    public log?: boolean = false

    public driver: string
    public drivers: {
        [s: string]: FilesystemAdapterConfig
    }
}
