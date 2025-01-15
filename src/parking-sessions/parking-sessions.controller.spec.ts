import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSessionsController } from './parking-sessions.controller';

describe('ParkingSessionsController', () => {
  let controller: ParkingSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingSessionsController],
    }).compile();

    controller = module.get<ParkingSessionsController>(ParkingSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
