import {Body, Controller, Inject, Post, UseGuards,} from '@nestjs/common';
import {AuthService} from '../../infrastructure/services/auth.service';
import {AuthenticationDTO} from 'src/domain/dto/authentication.dto';
import {AuthenticationResponseDTO} from 'src/domain/dto/authenticationResponse.dto';
import {RegisterDTO} from '../../domain/dto/register.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { RaspberryStateDto } from 'src/domain/dto/raspberryState.dto';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @UseGuards(JwtAuthGuard)
  @Post('/authenticate')
  authenticate(
      @Body() payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    return this.authService.authenticate(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  register(
      @Body() payload: RegisterDTO,
  ): void {
    this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  checkRaspberryStatus(): Promise<RaspberryStateDto> {
    return this.authService.checkRaspberryStatus();
  }
}
