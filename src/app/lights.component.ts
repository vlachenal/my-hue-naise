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
