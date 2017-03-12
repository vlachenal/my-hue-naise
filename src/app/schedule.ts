import { Command } from './command';

export class Schedule {
    name: string;
    description: string;
    command: Command;
    localtime: string;
    time: string;
    created: string;
    status: string;
    autodelete: boolean;
    starttime: string;
    recycle: boolean;
}
