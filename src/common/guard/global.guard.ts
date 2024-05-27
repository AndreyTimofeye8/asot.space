import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';

export const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};
