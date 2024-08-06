/* eslint-disable prettier/prettier */
import { DomainEventInterface } from "../../../common/domain/domain-event-interface";
import { StoredEvent, StoredEventId } from "../../../events/infra/database/domain/entities/stored-event.entity";

export interface StoredEventRepositoryInterface {
    allBetween(
        lowEventId: StoredEventId,
        highEventId: StoredEventId,
    ): Promise<StoredEvent[]>;

    allSince(eventId: StoredEventId): Promise<StoredEvent[]>;

    add(domainEvent: DomainEventInterface):StoredEvent;
}