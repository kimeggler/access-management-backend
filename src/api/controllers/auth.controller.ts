import { Body, Controller, Inject, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../../infrastructure/services/auth.service';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { LoginDTO } from 'src/domain/dto/login.dto';
import { LoginResponseDTO } from 'src/domain/dto/userResponse.dto';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('/login')
  login(@Body() payload: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.login(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  register(@Body() payload: RegisterDTO): Promise<LoginResponseDTO> {
    return this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
