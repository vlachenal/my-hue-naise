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
import { EventEmitter, Injectable }    from '@angular/core';

import { HueResponse } from './hue-response';

@Injectable()
export class ErrorService {
    public eventBus$: EventEmitter<Array<HueResponse>>;

    constructor() {
	this.eventBus$ = new EventEmitter();
    }

    manageErrors(responses: Array<HueResponse>): void {
	let err: Array<HueResponse> = new Array<HueResponse>();
	for(let res of responses) {
	    if(res.error != null) {
		err.push(res);
	    }
	}
	this.eventBus$.emit((err.length == 0) ? null : err);
    }

}
