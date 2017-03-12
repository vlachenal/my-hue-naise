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
