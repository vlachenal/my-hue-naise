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
