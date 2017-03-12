import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Bridge } from './bridge';
import { Group } from './group';
import { Light } from './light';

@Component({
    selector: 'hue-groups',
    templateUrl: 'groups.component.html',
    styleUrls: [
	'groups.component.css',
	'section.css'
    ]
})

export class GroupsComponent implements OnChanges {
    @Input()
    connection: Bridge;
    @Input()
    groups: { [idx: string]: Group; };
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
	if(this.groups == null) {
	    this.indexes = null;
	} else {
	    this.indexes = [];
	    for(let key in this.groups) {
		this.indexes.push(key);
	    }
	}
    }

    onSelectGroup(idx: string) {
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
