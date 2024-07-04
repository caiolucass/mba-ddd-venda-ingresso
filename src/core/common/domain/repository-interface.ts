/* eslint-disable prettier/prettier */
import { AggregateRoot } from "./aggregate.root";

export interface IRepository <E extends AggregateRoot> {
    add(entity: E): Promise<void>;
    findById(id: any): Promise<E | void>;
    findAll(): Promise<E[]>;
    delete(id: any): Promise<void>;
}