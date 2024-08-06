/* eslint-disable prettier/prettier */
import { EntityManager } from "@mikro-orm/mysql";
import { DomainEventInterface } from "apps/mba-dd-venda-ingresso/src/core/common/domain/domain-event-interface";
import { StoredEvent, StoredEventId } from "apps/mba-dd-venda-ingresso/src/core/events/infra/database/domain/entities/stored-event.entity";
import { StoredEventRepositoryInterface } from "../../../domain/entities/stored-event.repository";


export class StoredEventMysqlRepository implements StoredEventRepositoryInterface {
    constructor(private entityManager: EntityManager){}

    allBetween(
        lowEventId: StoredEventId,
        highEventId: StoredEventId,
    ): Promise<StoredEvent[]> {
        return this.entityManager.find(StoredEvent, {
            id: {$gte: lowEventId, $lte: highEventId},
        });
    }

    allSince(eventId: StoredEventId): Promise<StoredEvent[]> {
        return this.entityManager.find(StoredEvent, {id: {$gte: eventId}});
    }

    add(domainEvent: DomainEventInterface): StoredEvent {
        const storedEvent = StoredEvent.create(domainEvent);
        this.entityManager.persist(storedEvent);
        return storedEvent;
    }
}