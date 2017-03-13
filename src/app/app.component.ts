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
import { Component, OnInit } from '@angular/core';

import { Bridge } from './bridge';
import { BridgeService } from './bridge.service';
import { UserService } from './user.service';

const HUE_AUTHS: Map<string,string> = new Map<string,string>();

@Component({
    selector: 'hue-ui',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css' ],
    providers: [ BridgeService, UserService ]
})
export class AppComponent implements OnInit {
    title = 'MyHUEnaise';
    bridges: Bridge[];
    selBridge: Bridge;
    hueAuths = HUE_AUTHS;

    constructor(private bridgeService: BridgeService,
		private userService: UserService) {
	HUE_AUTHS['001788fffe28df9b'] = 'aTq7-EVOKVzCtIc5QW6wN5m-Ojus9nmiT0W5cPuI';
    }

    getBridges(): void {
	this.bridgeService.getBridges().then(bridges => {
	    this.bridges = bridges;
	    if(this.bridges.length == 1) {
		this.selBridge = this.bridges[0];
	    }
	});
    }

    ngOnInit(): void {
	this.getBridges();
    }

    onSelectBridge(bridge: Bridge): void {
	//bridge.userid = HUE_AUTHS[bridge.id];
        this.selBridge = bridge;
    }

}
