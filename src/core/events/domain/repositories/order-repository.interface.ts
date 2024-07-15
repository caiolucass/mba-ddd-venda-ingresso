/* eslint-disable prettier/prettier */
import { IRepository } from "src/core/common/domain/repository-interface";
import { Order } from "../entities/order.entity";

export interface OrderRepositoryInterface extends IRepository<Order> {}