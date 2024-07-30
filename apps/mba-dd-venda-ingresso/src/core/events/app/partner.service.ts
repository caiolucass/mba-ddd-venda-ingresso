/* eslint-disable prettier/prettier */
import { Partner } from "../domain/entities/partner.entity";
import { PartnerRepositoryInterface } from "../domain/repositories/partner-repository.interface";
import { ApplicationService } from "src/core/common/app/application.service";

export class PartnerService {
  constructor(
    private partnerRepo: PartnerRepositoryInterface,
    private applicationService: ApplicationService) {}

  list() {
    return this.partnerRepo.findAll();
  }

  async create(input: {name: string}) {
    return await this.applicationService.run(async () => {
      const partner = await Partner.create(input);
      await this.partnerRepo.add(partner);
      return partner;
    });
  }

  async update(id: string, input: {name?: string}) {
    return this.applicationService.run(async () => {
    const partner = await this.partnerRepo.findById(id);

    if(!partner){
        throw new Error('Partner not found');
    }

    await input.name && partner.changeName(input.name);

    await this.partnerRepo.add(partner);
    return partner;
    });
  }
}
