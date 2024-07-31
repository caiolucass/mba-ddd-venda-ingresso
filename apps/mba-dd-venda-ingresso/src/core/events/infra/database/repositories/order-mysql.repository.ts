/* eslint-disable prettier/prettier */
import { EntityManager } from "@mikro-orm/mysql";
import { OrderRepositoryInterface } from 'apps/mba-dd-venda-ingresso/src/core/events/domain/repositories/order-repository.interface';
import { Order, OrderId } from './../../../domain/entities/order.entity';

export class OrderMysqlRepository implements OrderRepositoryInterface {

    constructor(private entityManager: EntityManager){}

    async add(entity: Order): Promise<void> {
        this.entityManager.persist(entity);
    }

    findById(id: string | OrderId): Promise<Order | null> {
        return this.entityManager.findOneOrFail(Order, {
            id: typeof id === 'string' ? new OrderId(id): id,
        });
    }

    findAll(): Promise<Order[]> {;
        return this.entityManager.findAll(Order, {})
    }

    async delete(entity: Order): Promise<void> {
        this.entityManager.remove(entity);
    }   
}