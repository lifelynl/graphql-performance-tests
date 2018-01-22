import * as DataLoader from 'dataloader'

import { Airport } from '~/entities/Airport'
import { getAirportRepository } from '~/repositories/AirportRepository'

export interface Loaders {
    airports: DataLoader<{}, Airport>
}

export const createDataLoaders = (): Loaders => {
    return {
        airports: new DataLoader(ids => getAirportRepository().findByIds(ids))
    }
}
