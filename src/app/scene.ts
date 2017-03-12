import { StateRequest } from './state-request';

export class AppData {
    version: number;
    data: string;
}

export class Scene {
    name: string;
    lights: string[];
    owner: string;
    recycle: boolean;
    locked: boolean;
    appdata: AppData;
    picture: string;
    lastupdated: string;
    version: number;
    lightstates: { [id: string]: StateRequest };
}
