/* eslint-disable prettier/prettier */
import { IRepository } from "apps/mba-dd-venda-ingresso/src/core/common/domain/repository-interface";
import { Customer } from "../entities/customer.entity";

export interface CustomerRepositoryInterface extends IRepository<Customer> {}