import { Light } from './light';
import { Group } from './group';
import { Schedule } from './schedule';
import { Scene, AppData } from './scene';
//import { Rule } from './rule';
//import { Sensor } from './sensor';
//import { ResourceLink } from './resource-link';

export class BridgeConfig {
    name: string;
    zigbeechannel: number;
    bridgeid: string;
    mac: string;
    dhcp: boolean;
    ipaddress: string;
    netmask: string;
    gateway: string;
    proxyaddress: string;
    proxyport: number;
    UTC: string;
    localtime: string;
    timezone: string;
    modelid: string;
    swversion: string;
    apiversion: string;
    //swupdate: SoftwareUpdate;
    linkbutton: boolean;
    portalservices: boolean;
    portalconnection: string;
    //portalstate: PortalState;
    factorynew: boolean;
    replacesbridgeid: string;
    //backup: BackupBridge;
    //whitelist: { [idx: string]: DeviceInfo };
}

export class BridgeDetail {
    lights: { [idx: string]: Light };
    groups: { [idx: string]: Group };
    config: BridgeConfig;
    schedules: { [idx: string]: Schedule };
    scenes: { [idx: string]: Scene };
    //rules: { [idx: string]: Rule };
    //sensors: { [idx: string]: Sensor };
    //resourcelinks: { [idx: string]: ResourceLink };
}
