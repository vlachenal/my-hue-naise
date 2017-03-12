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
