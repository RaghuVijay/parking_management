import { Test, TestingModule } from '@nestjs/testing';
import { ParkingSessionsService } from './parking-sessions.service';

describe('ParkingSessionsService', () => {
  let service: ParkingSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingSessionsService],
    }).compile();

    service = module.get<ParkingSessionsService>(ParkingSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
