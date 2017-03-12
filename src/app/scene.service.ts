import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Scene } from './scene';
import { Bridge } from './bridge';
import { HueResponse } from './hue-response';


@Injectable()
export class SceneService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    setAttributes(bridge: Bridge, index: string, scene: Scene): Promise<HueResponse[]> {
	//return Promise.resolve(scene);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/scenes/${index}/`;
	return this.http.put(url, JSON.stringify(scene), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    setLightStates(bridge: Bridge, index: string, scene: Scene): Promise<HueResponse[]> {
	//return Promise.resolve(scene);
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/scenes/${index}/`;
	return this.http.put(url, JSON.stringify(scene), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json() as HueResponse[])
	    .catch(this.handleError);
    }

    getScene(bridge: Bridge, index: string): Promise<Scene> {
	const url = `http://${bridge.internalipaddress}/api/${bridge.userid}/scenes/${index}/`;
	return this.http.get(url)
	    .toPromise()
	    .then(res => res.json() as Scene)
	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	if(error instanceof Response) {
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
	console.error(errMsg);
	return Promise.reject(errMsg);
    }

}
