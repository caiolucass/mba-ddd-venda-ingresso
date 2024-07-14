/* eslint-disable prettier/prettier */
import { UnitOfWorkInterface } from "src/core/common/app/unit-of-work-.interface";
import { Partner } from "../domain/entities/partner.entity";
import { PartnerRepositoryInterface } from "../domain/repositories/partner-repository.interface";

export class PartnerService {
  constructor(private partnerRepo: PartnerRepositoryInterface, 
    private uow: UnitOfWorkInterface) {}

  list() {
    return this.partnerRepo.findAll();
  }

  async create(input: {name: string}) {
    const partner = await Partner.create(input);
    this.partnerRepo.add(partner);
    await this.uow.commit();
    return partner;
  }

  async update(id: string, input: {name?: string}) {
    const partner = await this.partnerRepo.findById(id);

    if(!partner){
        throw new Error('Partner not found');
    }

    input.name && partner.changeName(input.name);
    this.partnerRepo.add(partner);
    await this.uow.commit();
    return partner;
  }
}
