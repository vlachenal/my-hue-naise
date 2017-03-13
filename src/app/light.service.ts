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

import { Light, LightState } from './light';
import { Bridge } from './bridge';
import { StateRequest } from './state-request';
import { HueResponse } from './hue-response';


@Injectable()
export class LightService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    setState(bridge: Bridge, index: string, state: StateRequest): Promise<HueResponse[]> {
	//return Promise.resolve(state);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/lights/${index}/state/`;
	return this.http.put(url, JSON.stringify(state), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    setAttribute(bridge: Bridge, index: string, light: Light): Promise<HueResponse[]> {
	//return Promise.resolve(light);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/lights/${index}/`;
	return this.http.put(url, JSON.stringify(light), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
    }

}
