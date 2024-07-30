/* eslint-disable prettier/prettier */
import { ValueObject } from "./value-objects";

export interface DomainEventInterface {
    aggregate_id: ValueObject;
    occurred_on: Date;
    event_version: number;
}