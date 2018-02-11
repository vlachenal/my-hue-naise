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

import { Schedule } from './schedule';
import { StateRequest } from './state-request';
import { Bridge } from './bridge';
import { HueResponse } from './hue-response';


@Injectable()
export class ScheduleService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    setAttributes(bridge: Bridge, index: string,
		  schedule: Schedule): Promise<HueResponse[]> {
	//return Promise.resolve(schedule);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/schedules/${index}/`;
	return this.http.put(url, JSON.stringify(schedule), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	if (error instanceof Response) {
	    try {
		const body = error.json() || '';
		const err = body.error || JSON.stringify(body);
		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } catch(e) {
		errMsg = `${error.status} - ${error.statusText || ''}`;
	    }
	} else {
	    errMsg = error.message ? error.message : error.toString();
	}
	//console.error(errMsg);
	return Promise.reject(errMsg);
    }

}
