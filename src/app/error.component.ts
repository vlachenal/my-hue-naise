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
