import { Flight } from '~/entities/Flight'

import { Query } from './Query'

export interface FlightFilters {
    name?: string
}

export class FlightQuery extends Query<Flight> {

    public filter(filters: FlightFilters): this {
        const { name } = filters

        if (name) {
            this.andWhere('LOWER(flight.name) = LOWER(:name)', { name })
        }

        return this
    }

}
