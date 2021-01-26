import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { AccessService } from 'src/infrastructure/services/access.service';
import { AuthenticationResponseDTO } from 'src/domain/dto/authenticationResponse.dto';

@Controller('access')
export class AccessController {
  @Inject()
  private readonly accessService: AccessService;

  private readonly logger = new Logger(AccessController.name);

  @UseGuards(JwtAuthGuard)
  @Post('/authenticate')
  login(
    @Body() payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    this.logger.log('Authenticate ' + payload.user, payload.badgeId);
    return this.accessService.authenticate(payload);
  }
}
