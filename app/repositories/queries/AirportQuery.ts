import { Airport } from '~/entities/Airport'

import { Query } from './Query'

export interface AirportFilters {
    name?: string
}

export class AirportQuery extends Query<Airport> {

    public filter(filters: AirportFilters): this {
        const { name } = filters

        if (name) {
            this.andWhere('LOWER(airport.name) = LOWER(:name)', { name })
        }

        return this
    }

}
