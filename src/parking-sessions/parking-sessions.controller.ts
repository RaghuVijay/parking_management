import { Body, Controller, Headers, Post } from '@nestjs/common';
import { checkInDto } from './dtos/checkIn.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';
import { Auth } from 'src/auth/decorator/auth-type.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { ParkingSessionsService } from './providers/parking-sessions.service';
import { checkOutDto } from './dtos/checkOut.dto';

@Controller('session')
export class ParkingSessionsController {
  constructor(private readonly SessionService: ParkingSessionsService) {}
  @Post('/checkin')
  @Auth(AuthType.Bearer)
  public async checkIn(
    @Body() data: checkInDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.SessionService.CheckIn(data, user);
  }
  @Post('/checkout')
  @Auth(AuthType.Bearer)
  public async checkOut(
    @Body() data: checkOutDto,
    @ActiveUser() user: ActiveUserData,
    @Headers('authorization') authorization: string,
  ) {
    return this.SessionService.CheckOut(data, user, authorization);
  }
}
