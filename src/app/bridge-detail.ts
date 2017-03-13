/*
   MyHUEnaise: My HUE network administration interface simple edition
   Copyright (C) 2015 Vincent Lachenal

   This file is part of MyHUEnaise.

    MyHUEnaise is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    MyHUEnaise is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with MyHUEnaise.  If not, see <http://www.gnu.org/licenses/>.

*/
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
