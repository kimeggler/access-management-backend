import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from './user.service';
import {RaspberryAccessService} from '../../RaspberryPiApi/services/raspberryAccess.service';
import {AuthenticationResponseDTO} from 'src/domain/dto/authenticationResponse.dto';
import {AuthenticationDTO} from 'src/domain/dto/authentication.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Badge} from 'src/domain/models/badge.entity';
import {RegisterDTO} from 'src/domain/dto/register.dto';
import { RaspberryStateDto } from 'src/domain/dto/raspberryState.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async toResponseObject(data: any): Promise<AuthenticationResponseDTO> {
    const { authenticated, message } = data;
    return { authenticated, message };
  }

  public async authenticate(
      payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    const badge = await this.badgeRepository.findOne({
      where: {
        identifier: payload.badgeId
      }

    });

    if (badge === null || badge === undefined) {
      return this.toResponseObject({
        authenticated: false,
        message: "User is not in DB.",
      });
    }

    RaspberryAccessService.openDoor();

    return this.toResponseObject({
      authenticated: true,
      message: null,
    });
  }

  async openDoor() {
    RaspberryAccessService.openDoor();
  }

  async register(
      payload: RegisterDTO
  ) {
    let newBadge = new Badge();
    newBadge.firstName = payload.firstName;
    newBadge.lastName = payload.lastName;
    newBadge.identifier = 'abc';

    this.badgeRepository.save(newBadge);
  }

  async checkRaspberryStatus(): Promise<RaspberryStateDto> {
    return RaspberryAccessService.getState();
  }
}
