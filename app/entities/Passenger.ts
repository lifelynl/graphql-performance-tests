import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Flight } from './Flight'

export interface PassengerSchema {
    id?: number
    name?: string
}

@Entity()
export class Passenger extends BaseEntity {

    @Column()
    public name: string

    @ManyToMany(type => Flight, flight => flight.passengers)
    @JoinTable({ name: 'flight_has_passengers' })
    public flights: Flight[]

    /**
     * Creates (registers) a new user to the app.
     *
     * @param schema The user Schema.
     */
    public static async newPassenger(schema: PassengerSchema): Promise<Passenger> {
        const passenger = new Passenger
        console.log(schema);
        passenger.name = schema.name

        return passenger
    }

}
