
export class LightState {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: number[];
    ct: number;
    alert: string;
    colormode: string;
    reachable: boolean;
}

export class Light {
    state: LightState;
    type: string;
    name: string;
    modelid: string;
    manufacturername: string;
    uniqueid: string;
    swversion: string;
}
