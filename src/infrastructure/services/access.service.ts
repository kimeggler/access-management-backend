import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from '../../domain/models/user.entity';
import {UserService} from './user.service';
import {RaspberryAccessService} from '../../RaspberryPiApi/services/raspberryAccess.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class AccessService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async openDoor() {
        RaspberryAccessService.openDoor();
    }
}
