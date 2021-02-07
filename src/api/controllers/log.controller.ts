import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { LogService } from 'src/infrastructure/services/log.service';
import { LogResponseDTO } from 'src/domain/dto/responses/logResponse.dto';

@Controller('logs')
export class LogController {
  @Inject()
  private readonly logService: LogService;

  @UseGuards(JwtAuthGuard)
  @Post('/access')
  getAccessLogs(): Promise<LogResponseDTO[]> {
    return this.logService.findAllAccessLogs();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/access')
  getUserLogs(): Promise<LogResponseDTO[]> {
    return this.logService.findAllUserLogs();
  }
}
