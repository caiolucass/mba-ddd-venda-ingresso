/* eslint-disable prettier/prettier */
import { IRepository } from "src/core/common/domain/repository-interface";
import { Partner } from "../entities/partner.entity";

export interface PartnerRepositoryInterface extends IRepository<Partner> {}