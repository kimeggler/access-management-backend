import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '../../domain/dto/login.dto';
import { LoginResponseDTO } from '../../domain/dto/responses/loginResponse.dto';
import { RegisterDTO } from '../../domain/dto/register.dto';
import { User } from '../../domain/models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { LogService } from './log.service';
import { LogTypeENUM } from 'src/domain/enums/logtype';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logService: LogService,
  ) {}

  async log(data: string) {
    this.logService.createEntry({ log: data, type: LogTypeENUM.USER });
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      user: {
        userName: `${user.firstname} ${user.lastname}`,
        username: user.username,
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
      this.log(
        `Invalid login attempt using this username: ${payload.username}`,
      );
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
      this.log(
        `Attempted login with wrong password on user: ${payload.username}`,
      );
      throw new HttpException(
        'Invalide username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.generateToken(user);

    this.log(`Valid Login with user: ${payload.username}`);

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

    this.log(`Created new user: ${payload.username}`);

    return this.toResponseObject({ ...user, token });
  }
}
