import { Test, TestingModule } from '@nestjs/testing';
import { BloodPressureDataController } from './blood-pressure-data.controller';

describe('BloodPressureDataController', () => {
  let controller: BloodPressureDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodPressureDataController],
    }).compile();

    controller = module.get<BloodPressureDataController>(BloodPressureDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
