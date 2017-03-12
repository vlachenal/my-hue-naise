import { Component, Inject } from '@angular/core';

import { ErrorService } from './error.service';
import { HueResponse } from './hue-response';

@Component({
    //moduleId: module.id,
    selector: 'hue-error',
    templateUrl: 'error.component.html',
    styleUrls: [ 'error.component.css' ],
})
export class ErrorComponent {
    errors: Array<HueResponse>;

    constructor(@Inject(Error) private errorService: ErrorService) {
	this.errors = null;
	errorService.eventBus$.subscribe((errors: Array<HueResponse>) => {
	    this.setErrors(<Array<HueResponse>> errors);
	});
    }

    setErrors(errs: Array<HueResponse>): void {
	this.errors = errs;
    }

    close(): void {
	this.errors = null;
    }

}
