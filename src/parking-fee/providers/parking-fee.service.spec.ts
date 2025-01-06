import { Test, TestingModule } from '@nestjs/testing';
import { ParkingFeeService } from './parking-fee.service';

describe('ParkingFeeService', () => {
  let service: ParkingFeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingFeeService],
    }).compile();

    service = module.get<ParkingFeeService>(ParkingFeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
