import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ParkingStatusType } from '../enums/parking-statusType.enum';

export class checkOutDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  vehicle_code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  level_code: string;

  @IsNotEmpty()
  @IsString()
  session_id: string;

  @IsEnum(ParkingStatusType)
  status: ParkingStatusType;
}
