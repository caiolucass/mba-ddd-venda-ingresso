/* eslint-disable prettier/prettier */
import { EntityManager } from "@mikro-orm/mysql";
import { UnitOfWorkInterface } from "../app/unit-of-work-.interface";

export class UnitOfWorOrm implements UnitOfWorkInterface {

    constructor(private em: EntityManager){}

    commit(): Promise<void> {
        return this.em.flush();
    }

    async rollback(): Promise<void> {
        return this.em.clear();
    }
    
}