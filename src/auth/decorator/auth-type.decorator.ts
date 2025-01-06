import { AUTH_TYPE_KEY } from '../constsants/auth.constants';
import { AuthType } from '../enums/authType.enum';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);

export { AUTH_TYPE_KEY };
