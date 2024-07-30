/* eslint-disable prettier/prettier */
import { EntityManager } from "@mikro-orm/mysql";
import { UnitOfWorkInterface } from "../app/unit-of-work-.interface";
import { AggregateRoot } from "../domain/aggregate.root";

export class UnitOfWorkMikroOrm implements UnitOfWorkInterface {
    constructor(private em: EntityManager){}

    beginTransaction(): Promise<void> {
        return this.em.begin();
    }

    completeTransaction(): Promise<void> {
        return this.em.commit();
    }

    rollbackTransaction(): Promise<void> {
        return this.em.rollback();
    }

    runTransaction<T>(callback: () => Promise<T>): Promise<T> {
        return this.em.transactional(callback);
    }

    commit(): Promise<void> {
        return this.em.flush();
    }

    async rollback(): Promise<void> {
        return this.em.clear();
    }

    getAggregateRoots(): AggregateRoot[] {
        return [
            ...this.em.getUnitOfWork().getPersistStack(),
            ...this.em.getUnitOfWork().getRemoveStack(),
        ] as AggregateRoot[];
    }
}