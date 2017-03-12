import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Bridge } from './bridge';
import { Scene } from './scene';
import { Light } from './light';
import { SceneService } from './scene.service';
import { ErrorService } from './error.service';


@Component({
    selector: 'hue-scene',
    templateUrl: 'scene.component.html',
    styleUrls: [
	'scene.component.css',
	'item.css'
    ],
    providers: [ SceneService ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneComponent {
    @Input()
    connection: Bridge;
    @Input()
    index: string;
    @Input()
    scene: Scene;
    @Input()
    lights: { [idx: string]: Light; };
    allLights: { [id: string]: string; };
    selLights: Set<string>;
    selLightIdx: string;

    constructor(private sceneService: SceneService,
		@Inject(Error) private errorService: ErrorService) {
	this.selLightIdx = null;
    }

    ngOnChanges(changes: SimpleChanges): void {
	if(this.scene == null || this.lights == null) {
	    this.allLights = null;
	    this.selLights = null;
	} else {
	    if(this.scene.lightstates == null) {
	    this.sceneService.getScene(this.connection, this.index)
		    .then((res) => {
			this.scene.lightstates = res.lightstates
		    });
	    }
	    this.allLights = {};
	    this.selLights = new Set<string>();
	    for(let id in this.lights) {
		this.allLights[id] = this.lights[id].name;
		if(this.scene.lights.indexOf(id) > -1) {
		    this.selLights.add(id);
		}
	    }
	}
    }

    setSelectedLights = (sel: Set<string>): void => {
	this.selLights = sel;
	let selected: Array<string> = new Array<string>();
	let idx: number = 0;
	sel.forEach((item) => {
	    selected[idx++] = item;
	});
	let request: Scene = new Scene();
	request.lights = selected;
	this.sceneService.setAttributes(this.connection, this.index, request)
	    .then(res => {
		this.errorService.manageErrors(res);
		this.scene.lights = selected;
	    });
    }

    onSelectLight(idx: string): void {
	if(this.selLightIdx === idx) {
	    this.selLightIdx = null;
	} else {
	    this.selLightIdx = idx;
	}
    }

}
