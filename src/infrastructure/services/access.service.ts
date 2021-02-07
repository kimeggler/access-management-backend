import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user.entity';
import { RaspberryAccessService } from '../../RaspberryPiApi/services/raspberryAccess.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { RegisterBadgeDTO } from 'src/domain/dto/registerBadge.dto';
import { AuthenticationResponseDTO } from 'src/domain/dto/authenticationResponse.dto';
import { Badge } from 'src/domain/models/badge.entity';
import { RaspberryStateDto } from 'src/domain/dto/raspberryState.dto';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(User)
    private badgeRepository: Repository<Badge>,
  ) {}

  async toResponseObject(data: any): Promise<AuthenticationResponseDTO> {
    const { authenticated, message } = data;
    return { authenticated, message };
  }

  async openDoor() {
    RaspberryAccessService.openDoor();
  }

  public async authenticate(
    payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    const badge = await this.badgeRepository.findOne({
      where: {
        identifier: payload.badgeId,
      },
    });

    if (badge === null || badge === undefined) {
      return this.toResponseObject({
        authenticated: false,
        message: 'User is not in DB.',
      });
    }

    RaspberryAccessService.openDoor();

    return this.toResponseObject({
      authenticated: true,
      message: null,
    });
  }

  async register(payload: RegisterBadgeDTO) {
    let newBadge = new Badge();
    newBadge.firstName = payload.firstname;
    newBadge.lastName = payload.lastname;
    newBadge.identifier = 'abc';

    this.badgeRepository.save(newBadge);
  }

  async checkRaspberryStatus(): Promise<RaspberryStateDto> {
    return RaspberryAccessService.getState();
  }
}
