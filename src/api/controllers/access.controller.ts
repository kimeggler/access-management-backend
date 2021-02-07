import { Controller, Inject, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { AuthenticationResponseDTO } from 'src/domain/dto/authenticationResponse.dto';
import { RaspberryStateDto } from 'src/domain/dto/raspberryState.dto';
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
  @Post('/openDoor')
  openDoor(): void {
    this.accessService.openDoor();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  checkRaspberryStatus(): Promise<RaspberryStateDto> {
    return this.accessService.checkRaspberryStatus();
  }
}
