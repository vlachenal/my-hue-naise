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
