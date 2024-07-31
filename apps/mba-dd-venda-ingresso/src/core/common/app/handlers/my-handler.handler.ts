/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PartnerCreated } from "apps/mba-dd-venda-ingresso/src/core/events/domain/domain-events/partner-created.event";
import { PartnerRepositoryInterface } from "apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/partner-repository.interface";
import { DomainEventManager } from "../../domain/domain-event-manager";
import { DomainEventHandlerInterface } from "../domain-event-handler";

export class MyHandlerHandler implements DomainEventHandlerInterface {

    constructor(private partnerRepo: PartnerRepositoryInterface, 
        private domainEventManager: DomainEventManager){}

    async handle(event: PartnerCreated): Promise<void> {
        console.log(event);
    }

    static listenTo(): string[] {
        return [PartnerCreated.name];
    }
}