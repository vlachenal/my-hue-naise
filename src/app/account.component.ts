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
import { Component, Input } from '@angular/core';

import { Bridge } from './bridge';
import { BridgeService, CreateAccount } from './bridge.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
    //moduleId: module.id,
    selector: 'hue-account',
    templateUrl: 'account.component.html',
    styleUrls: [ 'account.component.css' ],
})
export class AccountComponent {
    @Input()
    bridge: Bridge;
    create: boolean;
    register: boolean;
    createRequest: CreateAccount;
    registerRequest: User;

    constructor(private userService: UserService, private bridgeService: BridgeService) {
	this.create = false;
	this.register = false;
	this.createRequest = new CreateAccount();
	this.registerRequest = new User();
    }

    switchToCreate(): void {
	this.register = false;
	this.create = !this.create;
    }

    switchToRegister(): void {
	this.create = false;
	this.register = !this.register;
    }

    createUser(): void {
	this.bridgeService.createUser(this.bridge, this.createRequest)
	    .then(res => {
		this.registerRequest.userid = res[0].success['username'];
		this.registerUser();
	    });
    }

    registerUser(): void {
	this.registerRequest.bridgeid = this.bridge.id;
	this.registerRequest.bridgename = null;
	this.userService.createUser(this.registerRequest).then(res => {
	    this.bridge.userid = res.userid;
	});
    }

}
