import { Module } from '@nestjs/common';
import { ServiceModule } from '../infrastructure/services/service.module';
import { AccessController } from './controllers/access.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, AccessController],
  exports: [],
})
export class ApiModule {}
