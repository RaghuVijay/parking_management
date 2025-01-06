import { Module } from '@nestjs/common';
import { ParkingFeeController } from './parking-fee.controller';
import { ParkingFeeService } from './providers/parking-fee.service';

import { DeleteParkingFeeProvider } from './providers/delete-parking-fee.provider';
import { UpdateParkingFeeProvider } from './providers/update-parking-fee.provider';
import { GetParkingFeeProvider } from './providers/get-parking-fee.provider';
import { CreateParkingFeeProvider } from './providers/create-parking-fee.provider';

@Module({
  controllers: [ParkingFeeController],
  providers: [
    ParkingFeeService,
    DeleteParkingFeeProvider,
    UpdateParkingFeeProvider,
    GetParkingFeeProvider,
    CreateParkingFeeProvider,
  ],
})
export class ParkingFeeModule {}
