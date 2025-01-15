import { Repository } from 'typeorm';
import { ParkingStatusType } from '../enums/parking-statusType.enum';
import { ParkingSession } from '../parking-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateParkingFeeProvider } from 'src/parking-fee/providers/create-parking-fee.provider';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CalculateTimeAndMoneyProviders {
  constructor(
    @InjectRepository(ParkingSession)
    private readonly parkingSessionRepository: Repository<ParkingSession>,

    private readonly createFee: CreateParkingFeeProvider,

    private readonly httpService: HttpService,
  ) {}

  public async generateTimeAndMoney(
    id: string,
    mallCode: string,
    authorization: string,
  ) {
    const userSessions = await this.parkingSessionRepository.find({
      where: { session_id: id },
    });

    if (!userSessions || userSessions.length === 0) {
      throw new Error(
        'Insufficient session data to calculate duration and cost.',
      );
    }

    const checkInSession = userSessions.find(
      (session) => session.status === ParkingStatusType.CHECKIN,
    );
    const checkOutSession = userSessions.find(
      (session) => session.status === ParkingStatusType.CHECKOUT,
    );

    if (!checkInSession || !checkOutSession) {
      throw new Error('Missing check-in or check-out session data.');
    }

    const checkInTime = new Date(checkInSession.createdAt).getTime() / 1000;
    const checkOutTime = new Date(checkOutSession.createdAt).getTime() / 1000;
    let totalDuration = checkOutTime - checkInTime;
    totalDuration = totalDuration / 60;

    if (totalDuration < 0) {
      throw new Error('Check-out time cannot be earlier than check-in time.');
    }
    const vehicleData = await firstValueFrom(
      this.httpService.get(
        `http://localhost:3000/vehicles/${checkInSession.vehicle_code}`,
        {
          headers: {
            Authorization: authorization,
          },
        },
      ),
    );

    const mallCost = await this.createFee.calculateAmount(
      mallCode,
      vehicleData.data.type,
    );
    let totalCost = undefined;
    if (totalDuration <= 60) {
      totalCost = mallCost.standardDeduction;
    } else if (totalDuration > 60) {
      const time = (totalDuration - 60) / 60;
      totalCost =
        Math.ceil(time) * mallCost.additionalDeduction +
        mallCost.standardDeduction;
    }

    return { totalDuration, totalCost };
  }
}
