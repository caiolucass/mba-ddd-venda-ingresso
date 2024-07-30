/* eslint-disable prettier/prettier */
import { SpotReservation } from './../../../domain/entities/spot-reservation.entity';
import { EntityManager } from "@mikro-orm/mysql";
import { EventSpotId } from 'src/core/events/domain/entities/event-spot.entity';
import { SpotReservationRepositoryInterface } from 'src/core/events/domain/repositories/spot-reservation-repository.interface';

export class SpotReservationMysqlRepository implements SpotReservationRepositoryInterface {

    constructor(private entityManager: EntityManager){}

    async add(entity: SpotReservation): Promise<void> {
        this.entityManager.persist(entity);
    }

    findById(id: string | EventSpotId): Promise<SpotReservation | null> {
        return this.entityManager.findOneOrFail(SpotReservation, {
            id: typeof id === 'string' ? new EventSpotId(id): id,
        });
    }

    findAll(): Promise<SpotReservation[]> {;
        return this.entityManager.findAll(SpotReservation, {})
    }

    async delete(entity: SpotReservation): Promise<void> {
        this.entityManager.remove(entity);
    }   
}