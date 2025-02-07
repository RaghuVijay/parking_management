import { Injectable } from '@nestjs/common';
import { CheckInParkingSessionsProvider } from './check-in-parking-sessions.provider';
import { CheckOutParkingSessionsProvider } from './check-out-parking-sessions.provider';
import { checkInDto } from '../dtos/checkIn.dto';
import { ActiveUserData } from 'src/auth/interface/active-user-interface';
import { checkOutDto } from '../dtos/checkOut.dto';
import { ParkingSessionInput } from '../interfaces/htmlInterface';
import { PdfGenerationService } from './generate-pdf.provider';

@Injectable()
export class ParkingSessionsService {
  constructor(
    private readonly CheckInProvider: CheckInParkingSessionsProvider,

    private readonly CheckOutProvider: CheckOutParkingSessionsProvider,

    private readonly pdfProvider: PdfGenerationService,
  ) {}
  public async CheckIn(data: checkInDto, user: ActiveUserData) {
    return this.CheckInProvider.CreateCheckIn(data, user);
  }
  public async CheckOut(
    data: checkOutDto,
    user: ActiveUserData,
    authorization: string,
  ) {
    return this.CheckOutProvider.checkOutSession(data, user, authorization);
  }
  public async createPdf(
    data: ParkingSessionInput,
    savepath: string,
    htmlpath: string,
  ) {
    return this.pdfProvider.generateInvoicePdf(data, savepath, htmlpath);
  }
}
