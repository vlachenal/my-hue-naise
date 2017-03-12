import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {
    //private userUrl = 'api/bridge';  // URL to web api
    private userUrl = 'http://localhost/api/bridge';  // URL to web api

    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
	return this.http.get(this.userUrl)
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError);
    }

    getUser(bridgeId: string): Promise<User> {
	const url = `${this.userUrl}/${bridgeId}`;
	return this.http.get(url)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    createUser(user: User): Promise<User> {
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.post(this.userUrl, JSON.stringify(user), options)
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    updateUser(user: User): Promise<User> {
	const url = `${this.userUrl}/${user.bridgeid}`;
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	return this.http.put(url, JSON.stringify(user), options)
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    private handleError(error: Response | any): Promise<any> {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	/*if(error instanceof Response) {
	    try {
		const body = error.json() || '';
		const err = body.error || JSON.stringify(body);
		errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	    } catch(e) {
		errMsg = `${error.status} - ${error.statusText || ''}`;
	    }
	} else {
	    errMsg = error.message ? error.message : error.toString();
	    }*/
	errMsg = 'plop';
	console.error(errMsg);
	return Promise.reject(errMsg);
    }

}
