import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Bridge } from './bridge';
import { Scene } from './scene';
import { Light } from './light';

@Component({
    selector: 'hue-scenes',
    templateUrl: 'scenes.component.html',
    styleUrls: [
	'scenes.component.css',
	'section.css'
    ]
})
export class ScenesComponent implements OnChanges {
    @Input()
    connection: Bridge;
    @Input()
    scenes: { [idx: string]: Scene; };
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
	if(this.scenes == null) {
	    this.indexes = null;
	} else {
	    this.indexes = [];
	    for(let key in this.scenes) {
		this.indexes.push(key);
	    }
	}
    }

    onSelectScene(idx: string) {
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
