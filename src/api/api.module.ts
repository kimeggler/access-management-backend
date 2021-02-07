import { Module } from '@nestjs/common';
import { ServiceModule } from '../infrastructure/services/service.module';
import { AccessController } from './controllers/access.controller';
import { AuthController } from './controllers/auth.controller';
import { LogController } from './controllers/log.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, AccessController, LogController],
  exports: [],
})
export class ApiModule {}
