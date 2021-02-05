import { Controller, Inject, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { AuthenticationResponseDTO } from 'src/domain/dto/authenticationResponse.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { AccessService } from 'src/infrastructure/services/access.service';
import { AuthService } from 'src/infrastructure/services/auth.service';

@Controller('access')
export class AccessController {
  @Inject()
  private readonly accessService: AccessService;
  private readonly authService: AuthService;

  @UseGuards(JwtAuthGuard)
  @Post('/authenticate')
  authenticate(
    @Body() payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    return this.authService.authenticate(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/openDoor')
  openDoor(): void {
    this.accessService.openDoor();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  checkRaspberryStatus(): Promise<RaspberryStateDto> {
    return this.authService.checkRaspberryStatus();
  }
}
