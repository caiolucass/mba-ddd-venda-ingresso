/* eslint-disable prettier/prettier */
import { DomainEventInterface } from 'src/core/common/domain/domain-event';
import { PartnerId } from '../entities/partner.entity';

/* eslint-disable prettier/prettier */
export class PartnerCreated implements DomainEventInterface {
    readonly event_version: number = 1;
    readonly occurred_on: Date;

    constructor(readonly aggregate_id: PartnerId, readonly name: string) {
        this.occurred_on = new Date();
    }
}