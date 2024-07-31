/* eslint-disable prettier/prettier */
import { IRepository } from "apps/mba-dd-venda-ingresso/src/core/common/domain/repository-interface";
import { Event } from "../entities/event.entity";

export interface EventRepositoryInterface extends IRepository<Event> {}
