import { RaspberryStateDto } from "src/domain/dto/raspberryState.dto";
import { RaspberryStateEnum } from "src/domain/enums/raspberryState.enum";

export class RaspberryAccessService {

    static openDoor() {

    }

    static getState(): Promise<RaspberryStateDto> {
        return new Promise((resolve) => {
            resolve({
                state: RaspberryStateEnum.READ
            });
        });
    }
}