/*
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

import { Light, LightState } from './light';
import { LighStateIface } from './light-state.iface';
import { MODELS, DEFAULT_GAMUT, Gamut } from './light.models';
import { StateRequest } from './state-request';

@Component({
    selector: 'hue-light-state',
    templateUrl: 'light-state.component.html',
    styleUrls: [
	'light-state.component.css',
	'section.css',
	'item.css'
    ]
})
export class LightStateComponent implements OnChanges {
    @Input()
    light: Light;
    @Input()
    state: LightState;
    @Input()
    component: LighStateIface;

    color: string;
    gamut: Gamut;

    constructor() {
	this.light = null;
	this.state = null;
	this.component = null;
	this.color = "#000000";
	this.gamut = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
	let clight = changes["light"];
	let cstate = changes["state"];
	if(clight == null || clight.currentValue == null
	  || cstate == null || cstate.currentValue == null) {
	    this.color = "#000000";
	    this.gamut = null;
	} else if(clight.previousValue == null
		  || clight.currentValue.uniqueid != clight.previousValue.uniqueid) {
	    if(MODELS[clight.currentValue.modelid] == null) {
		this.gamut = DEFAULT_GAMUT;
	    } else {
		this.gamut = MODELS[clight.currentValue.modelid];
	    }
	    if(cstate.currentValue.xy != null && cstate.currentValue.bri != null) {
		this.color = this.gamut.toRGB(cstate.currentValue.xy,
					      cstate.currentValue.bri);
	    } else {
		this.color = "#000000";
	    }
	}
    }

    toggleOn(): void {
	this.component.toggleOn();
    }

    setEffect(): void {
	this.component.setEffect();
    }

    setColor(): void {
	let colorState: LightState = this.gamut.fromRGB(this.color);
	this.state.xy = colorState.xy;
	this.state.bri = colorState.bri;
	let request: StateRequest = new StateRequest();
	request.xy = colorState.xy;
	request.bri = colorState.bri;
	this.component.setColor(request);
	//this.color = this.gamut.toRGB(request.xy, request.bri);
    }

    setBrightness(): void {
	this.component.setBrightness();
    }

}
