import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Bridge } from './bridge';
import { BridgeDetail } from './bridge-detail';
import { Schedule } from './schedule';

@Component({
    selector: 'hue-schedules',
    templateUrl: 'schedules.component.html',
    styleUrls: [
	'schedules.component.css',
	'section.css'
    ]
})
export class SchedulesComponent implements OnChanges {
    @Input()
    connection: Bridge;
    @Input()
    schedules: { [idx: string]: Schedule; };
    @Input()
    bridge: BridgeDetail;
    indexes: string[];
    selIdx: string;
    collapsed: boolean;

    constructor() {
	this.selIdx = null;
	this.collapsed = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
	if(this.schedules == null) {
	    this.indexes = null;
	} else {
	    this.indexes = [];
	    for(let key in this.schedules) {
		this.indexes.push(key);
	    }
	}
    }

    onSelectSchedule(idx: string) {
	if(this.selIdx === idx) {
	    this.selIdx = null;
	} else {
	    this.selIdx = idx;
	}
    }

    toggleCollapse() {
	this.collapsed = !this.collapsed;
    }

}
