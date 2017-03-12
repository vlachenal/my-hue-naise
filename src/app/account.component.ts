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
