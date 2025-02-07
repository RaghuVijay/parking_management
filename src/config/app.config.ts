import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  notificationUrl: process.env.AXIOS_PARKING_NOTIFICATION_MANAGEMENT_HOST,
  adminUrl: process.env.AXIOS_PARKING_ADMIN_HOST,
  userUrl: process.env.AXIOS_PARKING_USER_MANAGEMENT_HOST,
}));
