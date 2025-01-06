import { Test, TestingModule } from '@nestjs/testing';
import { ParkingFeeController } from './parking-fee.controller';

describe('ParkingFeeController', () => {
  let controller: ParkingFeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingFeeController],
    }).compile();

    controller = module.get<ParkingFeeController>(ParkingFeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
