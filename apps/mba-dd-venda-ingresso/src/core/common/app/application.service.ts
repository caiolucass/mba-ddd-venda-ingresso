/* eslint-disable prettier/prettier */
import { DomainEventManager } from "../domain/domain-event-manager";
import { UnitOfWorkInterface } from "./unit-of-work-.interface";

export class ApplicationService {
    constructor(
        private uow: UnitOfWorkInterface, 
        private domainEventManager: DomainEventManager,
    ){}

    start(){}

    async finish(){
        const aggregateRoots = this.uow.getAggregateRoots();

        for(const aggregateRoot of aggregateRoots) {
            this.domainEventManager.publish(aggregateRoot);
        }
      await this.uow.commit();
    }

    fail(){}

    async run<T>(callback: () =>Promise<T>): Promise<T> {
        await this.start();

        try {
            const result = await callback();
            await this.finish();
            return result;
        }catch(e){
            await this.fail();
            throw e;
        }
    }
}