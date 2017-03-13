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
import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Inject } from '@angular/core';

import { Bridge } from './bridge';
import { Light, LightState } from './light';
import { LightService } from './light.service';
import { LighStateIface } from './light-state.iface';
import { MODELS, DEFAULT_GAMUT, Gamut } from './light.models';
import { StateRequest } from './state-request';
import { ErrorService } from './error.service';


@Component({
    selector: 'hue-light',
    templateUrl: 'light.component.html',
    styleUrls: [
	'light.component.css',
	'item.css'
    ],
    providers: [
	LightService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightComponent implements OnChanges, LighStateIface {
    @Input()
    connection: Bridge;
    @Input()
    index: string;
    @Input()
    light: Light;

    color: string;

    constructor(private lightService: LightService,
		@Inject(Error) private errorService: ErrorService) {
	this.color = "#000000";
    }

    ngOnChanges(changes: SimpleChanges): void {
	/*let clight = changes["light"];
	if(clight == null || clight.currentValue == null) {
	    this.color = "#000000";
	} else if(clight.previousValue == null
		  || clight.currentValue.uniqueid != clight.previousValue.uniqueid) {
	    let gamut: Gamut;
	    if(MODELS[clight.currentValue.modelid] == null) {
		gamut = DEFAULT_GAMUT;
	    } else {
		gamut = MODELS[clight.currentValue.modelid];
	    }
	    this.color = gamut.toRGB(clight.currentValue.state.xy,
				     clight.currentValue.state.bri);
	}*/
    }

    toggleOn(): void {
	let request = new StateRequest();
	request.on = this.light.state.on;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setEffect(): void {
	let request = new StateRequest();
	request.effect = this.light.state.effect;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setAlert(): void {
	let request = new StateRequest();
	request.alert = this.light.state.alert;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setBrightness(): void {
	let request = new StateRequest();
	request.bri = +this.light.state.bri;
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setColor(request: StateRequest): void {
	/*let gamut: Gamut;
	if(MODELS[this.light.modelid] == null) {
	    gamut = DEFAULT_GAMUT;
	} else {
	    gamut = MODELS[this.light.modelid];
	}
	let colorState: LightState = gamut.fromRGB(color);
	this.light.state.xy = colorState.xy;
	this.light.state.bri = colorState.bri;
	let request: StateRequest = new StateRequest();
	request.xy = colorState.xy;
	request.bri = colorState.bri;*/
	this.lightService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
		//this.color = gamut.toRGB(request.xy, request.bri)
	    });
    }

    setName(): void {
	let request = new Light();
	request.name = this.light.name;
	this.lightService.setAttribute(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

}
