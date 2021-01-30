import { Test, TestingModule } from '@nestjs/testing';
import { BloodPressureDataService } from './blood-pressure-data.service';

describe('BloodPressureDataService', () => {
  let service: BloodPressureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodPressureDataService],
    }).compile();

    service = module.get<BloodPressureDataService>(BloodPressureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
