import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { checkInDto } from './dtos/checkIn.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';
import { Auth } from 'src/auth/decorator/auth-type.decorator';
import { AuthType } from 'src/auth/enums/authType.enum';
import { ParkingSessionsService } from './providers/parking-sessions.service';
import { checkOutDto } from './dtos/checkOut.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Controller('session')
export class ParkingSessionsController {
  constructor(
    private readonly SessionService: ParkingSessionsService,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
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
    @Res() res: Response,
  ) {
    let calculatedData = await this.SessionService.CheckOut(
      data,
      user,
      authorization,
    );

    const projectRoot = path.resolve(__dirname, '..');
    const relativeFilePath = '../src/templates/invoice.html';
    const absoluteFilePath = path.resolve(projectRoot, relativeFilePath);
    const outputPath = path.resolve(projectRoot, '../output');

    await this.SessionService.createPdf(
      calculatedData,
      `${outputPath}/${calculatedData.invoice}.pdf`,
      absoluteFilePath,
    );

    const notificationPath = this.configService.get(
      'appConfig.notificationUrl',
    );
    const requestBody = `${outputPath}/${calculatedData.invoice}.pdf`;
    await firstValueFrom(
      this.httpService.post(`${notificationPath}/mail/create`, requestBody, {
        headers: {
          Authorization: authorization,
        },
      }),
    );
    res.sendFile(`${outputPath}/${calculatedData.invoice}.pdf`);
  }
}
