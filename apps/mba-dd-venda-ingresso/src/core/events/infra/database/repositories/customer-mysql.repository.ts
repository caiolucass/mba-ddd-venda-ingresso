/* eslint-disable prettier/prettier */
import { EntityManager } from "@mikro-orm/mysql";
import { Customer, CustomerId } from "apps/mba-dd-venda-ingresso/src/core/events/domain/entities/customer.entity";
import { CustomerRepositoryInterface } from "apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/customer-repository.interface";

export class CustomerMysqlRepository implements CustomerRepositoryInterface {

    constructor(private entityManager: EntityManager){}

    async add(entity: Customer): Promise<void> {
        this.entityManager.persist(entity);
    }

    findById(id: string | CustomerId): Promise<Customer | null> {
        return this.entityManager.findOneOrFail(Customer, {
            id: typeof id === 'string' ? new CustomerId(id): id,
        });
    }

    findAll(): Promise<Customer[]> {;
        return this.entityManager.findAll(Customer, {})
    }

    async delete(entity: Customer): Promise<void> {
        this.entityManager.remove(entity);
    }   
}