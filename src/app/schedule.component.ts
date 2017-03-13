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
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Bridge } from './bridge';
import { BridgeDetail } from './bridge-detail';
import { Schedule } from './schedule';
import { StateRequest } from './state-request';
import { ScheduleService } from './schedule.service';
import { Command } from './command';
import { ErrorService } from './error.service';


@Component({
    selector: 'hue-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: [
	'schedule.component.css',
	'item.css'
    ],
    providers: [ ScheduleService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent {
    @Input()
    connection: Bridge;
    @Input()
    index: string;
    @Input()
    schedule: Schedule;
    @Input()
    bridge: BridgeDetail;

    constructor(private scheduleService: ScheduleService,
		@Inject(Error) private errorService: ErrorService) {
	// Nothing to do
    }

    ngOnChanges(changes: SimpleChanges): void {
	/*if(this.group == null || this.lights == null) {
	    this.allLights = null;
	    this.selLights = null;
	} else {
	    this.allLights = {};
	    this.selLights = new Set<string>();
	    for(let id in this.lights) {
		this.allLights[id] = this.lights[id].name;
		if(this.group.lights.indexOf(id) > -1) {
		    this.selLights.add(id);
		}
	    }
	}*/
    }

    setName(): void {
	let request: Schedule = new Schedule();
	request.name = this.schedule.name;
	this.scheduleService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setDescription(): void {
	let request: Schedule = new Schedule();
	request.description = this.schedule.description;
	this.scheduleService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setStatus(): void {
	let request: Schedule = new Schedule();
	request.status = this.schedule.status;
	this.scheduleService.setAttributes(this.connection, this.index, request);
    }

    setLocaltime(): void {
	// TODO check format
	let request: Schedule = new Schedule();
	request.localtime = this.schedule.localtime;
	this.scheduleService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setAutoDelete(): void {
	let request: Schedule = new Schedule();
	request.autodelete = this.schedule.autodelete;
	this.scheduleService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setCommand = (command: Command): void => {
    }

}
