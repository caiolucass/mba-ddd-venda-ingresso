/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PartnerController } from './partner.controller';

describe('PartnersController', () => {
  let controller: PartnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerController],
    }).compile();

    controller = module.get<PartnerController>(PartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
