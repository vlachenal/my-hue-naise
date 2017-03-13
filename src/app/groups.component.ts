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
