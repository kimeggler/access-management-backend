import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../../domain/dto/login.dto';
import { LoginResponseDTO } from '../../domain/dto/loginResponse.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { User } from '../../domain/models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = {
      user: {
        userName: `${user.firstname} ${user.lastname}`,
        username: user.username,
        roles: user.roles,
      },
      sub: user.id,
    };
    return await this.jwtService.sign(payload);
  }

  async toResponseObject(data: any): Promise<LoginResponseDTO> {
    const { username, token } = data;
    return { username, token };
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async login(payload: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.userService.findUserByUsername(payload.username);

    if (!user) {
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const correctPassword = await this.comparePassword(
      payload.password,
      user.password,
    );

    if (!correctPassword) {
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.generateToken(user);

    return this.toResponseObject({ ...user, token });
  }

  async register(payload: RegisterDTO): Promise<LoginResponseDTO> {
    let user = await this.userService.findUserByUsername(payload.username);
    Logger.warn(user);

    if (user) {
      throw new HttpException(
        'There is an existin account using this username.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashPassword(payload.password);
    user = await this.userService.createUser({
      ...payload,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);

    return this.toResponseObject({ ...user, token });
  }

  // async me(token: string): Promise<UserResponseDTO> {
  //   return this.toResponseObject({});
  // }
}
