/*
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
