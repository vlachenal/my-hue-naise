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
