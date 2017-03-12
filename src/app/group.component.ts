import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Bridge } from './bridge';
import { Group, GroupState } from './group';
import { Light } from './light';
import { StateRequest } from './state-request';
import { GroupService } from './group.service';
import { ErrorService } from './error.service';

@Component({
    selector: 'hue-group',
    templateUrl: 'group.component.html',
    styleUrls: [
	'group.component.css',
	'item.css'
    ],
    providers: [ GroupService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent {
    @Input()
    connection: Bridge;
    @Input()
    index: string;
    @Input()
    group: Group;
    @Input()
    lights: { [idx: string]: Light; };
    allLights: { [id: string]: string; };
    selLights: Set<string>;

    constructor(private groupService: GroupService,
		@Inject(Error) private errorService: ErrorService) {
	// Nothing to do
    }

    ngOnChanges(changes: SimpleChanges): void {
	if(this.group == null || this.lights == null) {
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
	}
    }

    toggleOn(): void {
	let request: StateRequest = new StateRequest();
	request.on = this.group.state.all_on;
	this.groupService.setState(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
		if(!this.group.state.all_on) {
		    this.group.state.any_on = false;
		}
	    });
    }

    setName(): void {
	let request: Group = new Group();
	request.name = this.group.name;
	this.groupService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setRoomClass(): void {
	let request: Group = new Group();
	request.class = this.group.class;
	this.groupService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
	    });
    }

    setSelectedLights = (sel: Set<string>): void => {
	this.selLights = sel;
	let selected: Array<string> = new Array<string>();
	let idx: number = 0;
	sel.forEach((item) => {
	    selected[idx++] = item;
	});
	let request: Group = new Group();
	request.lights = selected;
	this.groupService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
		this.group.lights = selected;
	    });
    }

}
