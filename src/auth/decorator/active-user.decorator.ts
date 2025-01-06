import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { ActiveUserData } from '../interface/active-user-interface';
import { REQUEST_USER_KEY } from '../constsants/auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
