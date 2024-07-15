/* eslint-disable prettier/prettier */
import { Order, OrderId } from './../../../domain/entities/order.entity';
import { EntityManager } from "@mikro-orm/mysql";
import { OrderRepositoryInterface } from 'src/core/events/domain/repositories/order-repository.interface';

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