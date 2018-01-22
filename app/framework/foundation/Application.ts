import { has } from 'lodash'

import { ApplicationConfig } from '~/framework/app'
import { ServiceProvider } from './ServiceProvider'

export class Application {

    /**
     * The application configuration
     */
    public config: ApplicationConfig

    /**
     * The path to the application root
     */
    public basePath: string

    /**
     * The instances of factories that are shared (singletons cache)
     */
    public shared: any = {}

    /**
     * The bindings registered with the application
     */
    public bindings: any = {}

    /**
     * The service providers registered with the application
     */
    public serviceProviders: ServiceProvider[] = []

    /**
     * Create a new Application
     *
     * @param config
     */
    constructor(config: ApplicationConfig) {
        this.config = config
        this.basePath = this.config.basePath
    }

    /**
     * Bind a new factory to the application
     */
    public bind<T extends Object>(identifier: string, factory: (app: Application) => T, shared: boolean = false) {
        if (has(this.bindings, identifier)) {
            throw new Error(`${identifier} is already registered with the application`)
        }

        this.bindings[identifier] = { factory, shared }
    }

    /**
     * Bind a new factory to the application as a singleton (shared instance)
     */
    public singleton<T extends Object>(identifier: string, factory: (app: Application) => T) {
        this.bind(identifier, factory, true)
    }

    /**
     * Create an instance from a bound factory
     */
    public make<T extends Object>(identifier: string): T {
        if (! has(this.bindings, identifier)) {
            throw new Error(`${identifier} is not registered with the application,
                             make sure there is a service provider that registers a factory for this class`)
        }

        if (has(this.shared, identifier)) {
            return this.shared[identifier]
        }

        const binding = this.bindings[identifier]
        const instance = binding.factory(this)

        if (binding.shared) {
            this.shared[identifier] = instance
        }

        return instance
    }

    /**
     * Register a service provider with the application
     */
    public register(serviceProvider: ServiceProvider) {
        this.serviceProviders.push(serviceProvider)
    }

    /**
     * Boot the application. This should be called after all providers are registered.
     */
    public boot() {
        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.register(this)
        })

        this.serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot(this)
        })
    }

}
