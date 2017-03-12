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
import { Light } from './light';

@Component({
    selector: 'hue-lights',
    templateUrl: 'lights.component.html',
    styleUrls: [
	'lights.component.css',
	'section.css'
    ]
})
export class LightsComponent implements OnChanges {
    @Input()
    connection: Bridge;
    @Input()
    lights: { [idx: string]: Light; };
    indexes: string[];
    selIdx: string;
    collapsed: boolean;

    constructor() {
	this.selIdx = null;
	this.collapsed = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
	this.indexes = [];
	for(let key in this.lights) {
	    this.indexes.push(key);
	}
    }

    onSelectLight(idx: string): void {
	if(this.selIdx === idx) {
	    this.selIdx = null;
	} else {
	    this.selIdx = idx;
	}
    }

    toggleCollapse(): void {
	this.collapsed = !this.collapsed;
    }

}
