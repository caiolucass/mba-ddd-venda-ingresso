/* eslint-disable prettier/prettier */
import { DomainEventInterface } from '../../../common/domain/domain-event-interface';
import { ValueObject } from '../../../common/domain/value-objects';

export class PartnerChanged implements DomainEventInterface {
  readonly event_version: number = 1;
  readonly occurred_on: Date;

  constructor(readonly aggregate_id: ValueObject, readonly name: string) {
    this.occurred_on = new Date();
  }
}
