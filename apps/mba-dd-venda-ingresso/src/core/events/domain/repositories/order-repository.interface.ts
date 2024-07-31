/* eslint-disable prettier/prettier */
import { IRepository } from "apps/mba-dd-venda-ingresso/src/core/common/domain/repository-interface";
import { Order } from "../entities/order.entity";

export interface OrderRepositoryInterface extends IRepository<Order> {}