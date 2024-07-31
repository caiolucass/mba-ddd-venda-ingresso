/* eslint-disable prettier/prettier */
import { IRepository } from "apps/mba-dd-venda-ingresso/src/core/common/domain/repository-interface";
import { Partner } from "../entities/partner.entity";

export interface PartnerRepositoryInterface extends IRepository<Partner> {}