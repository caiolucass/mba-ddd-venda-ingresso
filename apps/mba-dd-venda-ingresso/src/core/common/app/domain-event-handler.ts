/* eslint-disable prettier/prettier */
import { DomainEventInterface } from '../domain/domain-event-interface';

export interface DomainEventHandlerInterface {
    handle(event: DomainEventInterface): Promise<void>;
}