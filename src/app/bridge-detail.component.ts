import { Component, Input } from '@angular/core';

import { Bridge } from './bridge';
import { BridgeDetail } from './bridge-detail';

@Component({
    selector: 'hue-bridge-detail',
    templateUrl: 'bridge-detail.component.html',
    styleUrls: [
	'bridge-detail.component.css',
	'section.css'
    ]
})
export class BridgeDetailComponent {
    @Input()
    connection: Bridge;
    @Input()
    bridge: BridgeDetail;
    devicetype: string;
    collapsed: boolean;

    constructor() {
	this.collapsed = true;
    }

    toggleCollapse(): void {
	this.collapsed = !this.collapsed;
    }

}
