import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSession } from '../parking-session.entity';
import { Repository } from 'typeorm';
import { checkInDto } from '../dtos/checkIn.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';

@Injectable()
export class CheckInParkingSessionsProvider {
  constructor(
    @InjectRepository(ParkingSession)
    private ParkingSessionRepository: Repository<ParkingSession>,
  ) {}
  public async CreateCheckIn(data: checkInDto, user: ActiveUserData) {
    const obj = {
      customer_code: user.sub,
      vehicle_code: data.vehicle_code,
      level_code: data.level_code,
      status: data.status,
    };
    const CheckIn = await this.ParkingSessionRepository.create(obj);
    const newCheckIn = await this.ParkingSessionRepository.save(CheckIn);
    return newCheckIn;
  }
}
