import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';
import { RegisterBadgeDTO } from 'src/domain/dto/registerBadge.dto';
import { AuthenticationResponseDTO } from 'src/domain/dto/responses/authenticationResponse.dto';
import { Badge } from 'src/domain/models/badge.entity';
import { RaspberryStateEnum } from 'src/domain/enums/raspberrystate.enum';
import { RaspberryStateDTO } from 'src/domain/dto/raspberryState.dto';
import { ReaderModeDTO } from 'src/domain/dto/readerHealth.dto';

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
    //opendoor
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

    this.openDoor();

    return this.toResponseObject({
      authenticated: true,
      message: null,
    });
  }

  async register(payload: RegisterBadgeDTO) {
    const newBadge = new Badge();
    newBadge.firstName = payload.firstname;
    newBadge.lastName = payload.lastname;
    newBadge.identifier = 'abc';

    this.badgeRepository.save(newBadge);
  }

  async checkRaspberryHealth(): Promise<RaspberryStateDTO> {
    return new Promise((resolve) => {
      resolve({
        state: RaspberryStateEnum.HEALTHY,
      });
    });
  }

  async checkReaderStatus(): Promise<ReaderModeDTO> {
    return null;
  }
}
