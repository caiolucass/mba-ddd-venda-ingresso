/* eslint-disable prettier/prettier */
import { DomainEventInterface } from 'src/core/common/domain/domain-event';
import { PartnerId } from '../entities/partner.entity';

export class PartnerChangedName implements DomainEventInterface {
  readonly event_version: number = 1;
  readonly ocurred_on: Date;

  constructor(
    readonly aggregate_id: PartnerId,
    readonly name: string,
  ) {
    this.ocurred_on = new Date();
  }
}
