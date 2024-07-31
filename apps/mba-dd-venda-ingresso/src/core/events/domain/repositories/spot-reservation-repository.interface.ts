/* eslint-disable prettier/prettier */
import { IRepository } from "apps/mba-dd-venda-ingresso/src/core/common/domain/repository-interface";
import { SpotReservation } from "../entities/spot-reservation.entity";

export interface SpotReservationRepositoryInterface extends IRepository<SpotReservation> {}