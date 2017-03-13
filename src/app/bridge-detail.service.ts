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
import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bridge } from './bridge';
import { BridgeDetail } from './bridge-detail';
import { BRIDGE_DETAIL } from './bridge-detail.mock';


@Injectable()
export class BridgeDetailService {

    constructor(private http: Http) { }

    getBridgeDetail(bridge: Bridge): Promise<BridgeDetail> {
	//return Promise.resolve(BRIDGE_DETAIL);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/`;
	return this.http.get(url)
	    .toPromise()
	    .then(res => res.json() as BridgeDetail)
	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
    }

}
