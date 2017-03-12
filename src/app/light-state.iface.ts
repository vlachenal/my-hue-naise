//import { LightState } from './light';
import { StateRequest } from './state-request';

export interface LighStateIface {
    //state: LightState;
    toggleOn(): void;
    setEffect(): void;
    setColor(request: StateRequest): void;
    setBrightness(): void;
}
