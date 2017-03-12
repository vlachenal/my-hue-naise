import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AppComponent } from './app.component'
import { Bridge } from './bridge';
import { BridgeDetail } from './bridge-detail';
import { BridgeDetailService } from './bridge-detail.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'hue-bridge',
    templateUrl: 'bridge.component.html',
    styleUrls: [ 'bridge.component.css' ],
    providers: [ BridgeDetailService ]
})
export class BridgeComponent implements OnChanges {
    @Input()
    bridge: Bridge;
    detail: BridgeDetail;

    constructor(private bridgeDetailService: BridgeDetailService,
		private userService: UserService) {
	// Nothing to do
    }

    ngOnChanges(changes: SimpleChanges): void {
	if(this.bridge != null) {
	    this.bridgeDetailService.getBridgeDetail(this.bridge).then(detail => {
		this.detail = detail;
		if(this.bridge.name == null) {
		    this.updateBridge(detail.config.name);
		}
	    });
	}
    }

    updateBridge(name: string): void {
	let user = new User();
	user.bridgeid = this.bridge.id;
	user.userid = this.bridge.userid;
	user.bridgename = name;
	this.userService.updateUser(user)
	    .then(() => this.bridge.name = name)
	    .catch(e => console.log("reject: " + e));
    }

}
