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
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BridgeDetail } from './bridge-detail';
import { Command } from './command';
import { LighStateIface } from './light-state.iface';

@Component({
    selector: 'hue-command',
    templateUrl: 'command.component.html',
    styleUrls: [
	'command.component.css'
    ]
})
export class CommandComponent implements OnChanges, LighStateIface {
    @Input()
    command: Command;
    @Input()
    bridge: BridgeDetail;
    @Input()
    callback: (command: Command) => void;
    user: string;
    object: string;
    objectId: string;
    subReqAddr: string;
    groupIds: Set<string>;
    lightIds: Set<string>;
    sceneIds: Set<string>;

    constructor() {
	this.groupIds = new Set<string>();
	this.lightIds = new Set<string>();
	this.sceneIds = new Set<string>();
    }

    ngOnChanges(changes: SimpleChanges): void {
	this.user = null;
	this.object = null;
	this.objectId = null;
	this.subReqAddr = null;
	this.groupIds.clear();
	this.lightIds.clear();
	this.sceneIds.clear();
	if(this.command != null) {
	    let result = /^\/api\/([^\/]+)\/([^\/]+)\/([^\/]+)(\/([^\/]+))?$/i.exec(this.command.address);
	    if(result) {
		this.user = result[1];
		this.object = result[2];
		this.objectId = result[3];
		if(result[4] != null && result[4] != '') {
		    this.subReqAddr = result[5];
		}
	    }
	}
	if(this.bridge != null) {
	    for(let id in this.bridge.groups) {
		this.groupIds.add(id);
	    }
	    for(let id in this.bridge.lights) {
		this.lightIds.add(id);
	    }
	    for(let id in this.bridge.scenes) {
		this.sceneIds.add(id);
	    }
	}
    }

    toggleOn(): void {
	/*let request = new StateRequest();
	request.on = this.light.state.on;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });*/
    }

    setEffect(): void {
	/*let request = new StateRequest();
	request.effect = this.light.state.effect;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });*/
    }

    setAlert(): void {
	/*let request = new StateRequest();
	request.alert = this.light.state.alert;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });*/
    }

    setBrightness(): void {
	/*let request = new StateRequest();
	request.bri = +this.light.state.bri;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });*/
    }

    setColor(): void {
	/*let gamut: Gamut;
	if(MODELS[this.light.modelid] == null) {
	    gamut = DEFAULT_GAMUT;
	} else {
	    gamut = MODELS[this.light.modelid];
	}
	let colorState: LightState = gamut.fromRGB(this.color);
	this.light.state.xy = colorState.xy;
	this.light.state.bri = colorState.bri;
	let request: StateRequest = new StateRequest();
	request.xy = colorState.xy;
	request.bri = colorState.bri;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
		this.color = gamut.toRGB(request.xy, request.bri)
	    });*/
    }

}
