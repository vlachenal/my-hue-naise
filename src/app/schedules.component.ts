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
