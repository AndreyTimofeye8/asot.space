import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

export const globalGuardProviders = [
  {
    provide: APP_GUARD,
    useClass: JwtGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];
