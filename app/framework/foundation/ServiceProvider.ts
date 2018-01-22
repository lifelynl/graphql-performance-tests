import { Application } from './Application'

export abstract class ServiceProvider {

    public boot(app: Application): void {
        // Not implemented
    }

    public abstract register(app: Application): void

}
