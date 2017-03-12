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
