import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingSession } from '../parking-session.entity';
import { Repository } from 'typeorm';
import { checkOutDto } from '../dtos/checkOut.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';
import { CalculateTimeAndMoneyProviders } from './calculate-time-and-money.providers';

@Injectable()
export class CheckOutParkingSessionsProvider {
  constructor(
    @InjectRepository(ParkingSession)
    private ParkingSessionRepository: Repository<ParkingSession>,

    private readonly calculateTotal: CalculateTimeAndMoneyProviders,
  ) {}
  public async checkOutSession(
    data: checkOutDto,
    user: ActiveUserData,
    authorization: string,
  ) {
    const mallCode = user.mall_code;
    const obj = {
      customer_code: user.sub,
      vehicle_code: data.vehicle_code,
      level_code: data.level_code,
      status: data.status,
      session_id: data.session_id,
    };

    let checkOut = await this.ParkingSessionRepository.create(obj);
    let newCheckOut = await this.ParkingSessionRepository.save(checkOut);
    let total = await this.calculateTotal.generateTimeAndMoney(
      data.session_id,
      mallCode,
      authorization,
    );
    return [newCheckOut, total];
  }
}
