import { LightState } from './light';

export class GroupState {
    all_on: boolean;
    any_on: boolean;
}

export class Group {
    name: string;
    lights: string[];
    type: string;
    state: GroupState;
    "class": string;
    action: LightState;
}
