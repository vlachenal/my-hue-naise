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
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {
    private userUrl = 'api/bridge';  // URL to web api
    //private userUrl = 'http://localhost/api/bridge';  // URL to web api

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
	//console.error(errMsg);
	return Promise.reject(errMsg);
    }

}
