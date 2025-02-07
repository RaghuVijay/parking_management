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
import { PdfGenerationService } from './providers/generate-pdf.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [ParkingSessionsController],
  providers: [
    ParkingSessionsService,
    CheckInParkingSessionsProvider,
    CheckOutParkingSessionsProvider,
    CalculateTimeAndMoneyProviders,
    PdfGenerationService,
  ],
  imports: [
    TypeOrmModule.forFeature([ParkingSession]),
    ParkingFeeModule,
    HttpModule,
    ConfigModule,
  ],
})
export class ParkingSessionsModule {}
