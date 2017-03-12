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
