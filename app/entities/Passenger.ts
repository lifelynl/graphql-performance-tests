import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Flight } from './Flight'

@Entity()
export class Passenger extends BaseEntity {

    @Column()
    public name: string

    @ManyToMany(type => Flight, flight => flight.passengers)
    @JoinTable({ name: 'flight_has_passengers' })
    public flights: Flight[]

}
