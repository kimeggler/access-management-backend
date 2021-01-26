import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { User } from '../../domain/models/user.entity';
import { Repository } from 'typeorm';
import { AuthenticationResponseDTO } from 'src/domain/dto/authenticationResponse.dto';
import { AuthenticationDTO } from 'src/domain/dto/authentication.dto';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async authenticate(
    payload: AuthenticationDTO,
  ): Promise<AuthenticationResponseDTO> {
    const badge = this.userRepository.findOne({});

    return null;
  }

  public async createUser(user: RegisterDTO): Promise<User> {
    return this.userRepository.save(user);
  }
}
