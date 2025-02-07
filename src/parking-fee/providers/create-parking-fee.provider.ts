import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parkingfee } from '../parking-fee.entity';
import { Repository } from 'typeorm';
import { VehicleType } from '../enums/VehicleTypes.enum';
import { DeductionType } from '../enums/DeductionType.enum';

@Injectable()
export class CreateParkingFeeProvider {
  constructor(
    @InjectRepository(Parkingfee)
    private readonly parkingfeeRepository: Repository<Parkingfee>,
  ) {}

  public async calculateAmount(mall_code: string, type: VehicleType) {
    const fees = await this.parkingfeeRepository.find({
      where: { mall_code, vehicle_type: type },
    });

    if (!fees || fees.length === 0) {
      throw new Error(
        `No parking fees found for vehicle type: ${type} in mall_code: ${mall_code}`,
      );
    }

    let standardDeductionBike = 0;
    let additionalDeductionBike = 0;
    let standardDeductionCar = 0;
    let additionalDeductionCar = 0;

    let charges = {
      CAR: {
        standard: 0,
        additional: 0,
      },
      BIKE: {
        standard: 0,
        additional: 0,
      },
    };
    let VEH_TYPE = 'CAR';
    let fee = charges[VEH_TYPE];
    fee.standard, fee.additional;

    // Iterate over the fees and check the values
    for (const fee of fees) {
      if (fee.vehicle_type === VehicleType.BIKE) {
        if (fee.type === DeductionType.STD_DEDUCTION) {
          standardDeductionBike = fee.cost; // Accumulate the standard deduction for BIKE
        } else if (fee.type === DeductionType.ADDITIONAL_DEDUCTION) {
          additionalDeductionBike = fee.cost; // Accumulate the additional deduction for BIKE
        }
      } else if (fee.vehicle_type === VehicleType.CAR) {
        if (fee.type === DeductionType.STD_DEDUCTION) {
          standardDeductionCar = fee.cost; // Accumulate the standard deduction for CAR
        } else if (fee.type === DeductionType.ADDITIONAL_DEDUCTION) {
          additionalDeductionCar = fee.cost; // Accumulate the additional deduction for CAR
        }
      }
    }

    // Log final deductions for each vehicle type

    // Return the deduction values based on input type
    if (type === VehicleType.BIKE) {
      return {
        standardDeduction: standardDeductionBike,
        additionalDeduction: additionalDeductionBike,
      };
    } else if (type === VehicleType.CAR) {
      return {
        standardDeduction: standardDeductionCar,
        additionalDeduction: additionalDeductionCar,
      };
    }

    // Handle unsupported vehicle types (optional)
    throw new Error(`Unsupported vehicle type: ${type}`);
  }
}
