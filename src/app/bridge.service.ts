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
import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bridge } from './bridge';
import { BRIDGES } from './mock-bridges';
import { HueResponse } from './hue-response'


export class CreateAccount {
    devicetype: string;
}

@Injectable()
export class BridgeService {

    //private bridgesUrl = 'api/bridge';  // URL to web api
    private bridgesUrl = 'http://localhost/api/bridge';  // URL to web api

    constructor(private http: Http) { }

    getBridges(): Promise<Bridge[]> {
	//return Promise.resolve(BRIDGES);
	return this.http.get(this.bridgesUrl)
	    .toPromise()
	    .then(res => res.json() as Bridge[])
	    .catch(this.handleError);
    }

    createUser(bridge: Bridge, account: CreateAccount): Promise<HueResponse[]> {
	const url = `http://${bridge.internalipaddress}/api/`;
	return this.http.get(url)
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
    }

}
