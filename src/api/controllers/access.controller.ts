import {Controller, Inject, Post, UseGuards,} from '@nestjs/common';
import {JwtAuthGuard} from 'src/infrastructure/guards/jwt-auth.guard';
import {AccessService} from 'src/infrastructure/services/access.service';

@Controller('access')
export class AccessController {
    @Inject()
    private readonly accessService: AccessService;

    @UseGuards(JwtAuthGuard)
    @Post('/openDoor')
    openDoor(): void {
        this.accessService.openDoor();
    }
}
