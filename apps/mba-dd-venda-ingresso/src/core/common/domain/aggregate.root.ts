/* eslint-disable prettier/prettier */
import { DomainEventInterface } from "./domain-event-interface";
import { Entity } from "./entity";

export abstract class AggregateRoot extends Entity {
    events: Set<DomainEventInterface> = new Set <DomainEventInterface>();

    addEvent(event: DomainEventInterface) {
        this.events.add(event);
    }

    clearEvent() {
        this.events.clear();
    }
}