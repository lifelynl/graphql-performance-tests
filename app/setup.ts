import { Airport } from '~/entities/Airport'
import { getAirportRepository } from '~/repositories/AirportRepository'

import { Flight } from '~/entities/Flight'
import { getFlightRepository } from '~/repositories/FlightRepository'

import { Passenger } from '~/entities/Passenger'
import { getPassengerRepository } from '~/repositories/PassengerRepository'

export const setupDatabase = async () => {
    if (await getAirportRepository().count() === 0) {
        const schiphol = await getAirportRepository().save(new Airport({
            name: 'Amsterdam Schiphol',
        }))

        const heathrow = await getAirportRepository().save(new Airport({
            name: 'London Heathrow',
        }))

        const passengers = [
            await getPassengerRepository().save(new Passenger({ name: 'Jesse de Vries' })),
            await getPassengerRepository().save(new Passenger({ name: 'Bryan te Beek' })),
            await getPassengerRepository().save(new Passenger({ name: 'Peter Peerdeman' })),
        ]

        for (let i = 0; i < 3; i++) {
            await getFlightRepository().save(await new Flight({
                name: `ABXYZ${i}`,
                sourceAirport: schiphol,
                destinationAirport: heathrow,
                passengers
            }))
        }
    }
}
