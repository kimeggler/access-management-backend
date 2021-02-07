import { Controller, Inject, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { AuthenticationResponseDTO } from 'src/domain/dto/responses/authenticationResponse.dto';
import { RaspberryStateDTO } from 'src/domain/dto/raspberryState.dto';
import { ReaderModeDTO } from 'src/domain/dto/readerHealth.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { AccessService } from 'src/infrastructure/services/access.service';

@Controller('access')
export class AccessController {
  @Inject()
  private readonly accessService: AccessService;

  @UseGuards(JwtAuthGuard)
  @Post('/authenticate')
  authenticate(
    @Body() payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    return this.accessService.authenticate(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/open')
  openDoor(): void {
    this.accessService.openDoor();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  checkReaderStatus(): Promise<ReaderModeDTO> {
    return this.accessService.checkReaderStatus();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/health')
  checkRaspberryHealth(): Promise<RaspberryStateDTO> {
    return this.accessService.checkRaspberryHealth();
  }
}
