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


@Component({
    selector: 'dual-list',
    templateUrl: 'dual-list.component.html',
    styleUrls: [
	'dual-list.component.css'
    ]
})
export class DualListComponent implements OnChanges {
    @Input()
    all: { [id: string]: string; };
    @Input()
    sel: Set<string>;
    @Input()
    callback: (sel: Set<string>) => void;
    availableIdx: Set<string>;

    constructor() {
	this.availableIdx = new Set<string>();
    }

    ngOnChanges(changes: SimpleChanges): void {
	this.availableIdx.clear();
	if(this.all != null && this.sel != null) {
	    for(let id in this.all) {
		if(!this.sel.has(id)) {
		    this.availableIdx.add(id);
		}
	    }
	}
    }

    removeFromSelected(id: string): void {
	let selected: Set<string> = new Set<string>(this.sel.values());
	selected.delete(id);
	this.callback(selected);
    }

    addToSelected(id: string): void {
	let selected: Set<string> = new Set<string>(this.sel.values());
	selected.add(id);
	this.callback(selected);
    }

}
