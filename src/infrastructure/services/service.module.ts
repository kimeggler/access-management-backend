import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '../../common/config/config.module';
import { ConfigService } from '../../common/config/config.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/models/user.entity';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { Badge } from 'src/domain/models/badge.entity';
import { AccessService } from './access.service';
import { LogService } from './log.service';
import { Log } from 'src/domain/models/log.entity';
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User, Badge, Log]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.secret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, AccessService, LogService],
  exports: [AuthService, UserService, AccessService, LogService],
})
export class ServiceModule {}
