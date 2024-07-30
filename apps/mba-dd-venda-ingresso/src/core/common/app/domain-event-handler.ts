/* eslint-disable prettier/prettier */
import { DomainEventInterface } from './../domain/domain-event';

export interface DomainEventHandlerInterface {
    handle(event: DomainEventInterface): Promise<void>;
}