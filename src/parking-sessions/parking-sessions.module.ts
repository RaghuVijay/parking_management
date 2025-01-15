import { Module } from '@nestjs/common';
import { ParkingSessionsController } from './parking-sessions.controller';
import { ParkingSessionsService } from './providers/parking-sessions.service';
import { CheckInParkingSessionsProvider } from './providers/check-in-parking-sessions.provider';
import { CheckOutParkingSessionsProvider } from './providers/check-out-parking-sessions.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSession } from './parking-session.entity';
import { CalculateTimeAndMoneyProviders } from './providers/calculate-time-and-money.providers';
import { ParkingFeeModule } from 'src/parking-fee/parking-fee.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ParkingSessionsController],
  providers: [
    ParkingSessionsService,
    CheckInParkingSessionsProvider,
    CheckOutParkingSessionsProvider,
    CalculateTimeAndMoneyProviders,
  ],
  imports: [
    TypeOrmModule.forFeature([ParkingSession]),
    ParkingFeeModule,
    HttpModule,
  ],
})
export class ParkingSessionsModule {}
