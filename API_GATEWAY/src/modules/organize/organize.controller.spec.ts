import { Test, TestingModule } from '@nestjs/testing';
import { OrganizeController } from './organize.controller';

describe('OrganizeController', () => {
  let controller: OrganizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizeController],
    }).compile();

    controller = module.get<OrganizeController>(OrganizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
