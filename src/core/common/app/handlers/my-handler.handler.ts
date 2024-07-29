/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PartnerCreated } from "src/core/events/domain/domain-events/partner-created.event";
import { DomainEventHandlerInterface } from "../domain-event-handler";
import { PartnerRepositoryInterface } from "src/core/events/domain/repositories/partner-repository.interface";
import { DomainEventManager } from "../../domain/domain-event-manager";

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