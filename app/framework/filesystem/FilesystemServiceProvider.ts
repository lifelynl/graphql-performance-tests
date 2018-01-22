import { Application, ServiceProvider } from '~/framework/foundation'

import { Filesystem } from './Filesystem'
import { FilesystemAdapterType, FilesystemAdapterConfig } from './FilesystemConfig'

import { FilesystemAdapter } from './adapters/FilesystemAdapter'
import { S3FilesystemAdapter, S3FilesystemAdapterConfig } from './adapters/S3FilesystemAdapter'
import { LocalFilesystemAdapter, LocalFilesystemAdapterConfig } from './adapters/LocalFilesystemAdapter'

export class FilesystemServiceProvider extends ServiceProvider {

    public register(app: Application): void {
        const drivers = app.config.filesystem.drivers

        for (const driver in drivers) {
            if (drivers.hasOwnProperty(driver)) {
                app.singleton<Filesystem>(`filesystem.${driver}`, app => {
                    const driverConfig = drivers[driver]
                    const adapter = this.getAdapter(driverConfig)

                    return new Filesystem(adapter)
                })
            }
        }
    }

    public getAdapter(config: FilesystemAdapterConfig): FilesystemAdapter {
        switch (config.adapter) {
            case FilesystemAdapterType.LOCAL: return new LocalFilesystemAdapter(<LocalFilesystemAdapterConfig> config)
            case FilesystemAdapterType.S3: return new S3FilesystemAdapter(<S3FilesystemAdapterConfig> config)
        }
    }

}
