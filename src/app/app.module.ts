import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { BridgeComponent }  from './bridge.component';
import { BridgeDetailComponent }  from './bridge-detail.component';
import { LightsComponent } from './lights.component';
import { LightComponent } from './light.component';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group.component';
import { DualListComponent } from './dual-list.component';
import { SchedulesComponent } from './schedules.component';
import { ScheduleComponent } from './schedule.component';
import { CommandComponent } from './command.component';
import { ScenesComponent } from './scenes.component';
import { SceneComponent } from './scene.component';
import { AccountComponent } from './account.component';
import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { LightStateComponent } from './light-state.component';


@NgModule({
    imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	JsonpModule
    ],
    declarations: [
	AppComponent,
        BridgeComponent,
        BridgeDetailComponent,
        LightsComponent,
        LightComponent,
        GroupsComponent,
        GroupComponent,
	DualListComponent,
        SchedulesComponent,
        ScheduleComponent,
	CommandComponent,
        ScenesComponent,
        SceneComponent,
	AccountComponent,
	ErrorComponent,
	LightStateComponent
    ],
    providers: [
	ErrorService,
	{ provide: Error, useExisting: ErrorService }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
