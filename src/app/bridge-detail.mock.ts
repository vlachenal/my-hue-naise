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
import { BridgeDetail, BridgeConfig } from './bridge-detail';
import { Light, LightState } from './light';
import { Group, GroupState } from './group';
import { Schedule } from './schedule';
import { Command } from './command';
import { Scene, AppData } from './scene';
import { StateRequest } from './state-request';

export const BRIDGE_DETAIL: BridgeDetail = {
    lights: <{ [idx: string]: Light }>{
	"1": <Light>{
	    state: <LightState>{
		on: true,
		bri: 144,
		hue: 13524,
		sat: 200,
		effect: 'none',
		xy: [
		    0.5017,
		    0.4152
		],
		ct: 443,
		alert: 'none',
		colormode: 'xy',
		reachable: true
	    },
	    'type': 'Extended color light',
	    name: 'Salon',
	    modelid: 'LCT007',
	    manufacturername: 'Philips',
	    uniqueid: '00:17:88:01:10:26:64:bc-0b',
	    swversion: '5.38.1.14919'
	},
	"2": <Light>{
	    state: <LightState>{
		on: false,
		bri: 254,
		hue: 13524,
		sat: 200,
		effect: 'none',
		xy: [
		    0.5017,
		    0.4152
		],
		ct: 443,
		alert: 'none',
		colormode: 'xy',
		reachable: true
	    },
	    'type': 'Extended color light',
	    name: 'Salle à manger',
	    modelid: 'LCT007',
	    manufacturername: 'Philips',
	    uniqueid: '00:17:88:01:10:26:64:bd-0b',
	    swversion: '5.38.1.14919'
	},
	"3": <Light>{
	    state: <LightState>{
		on:true,
		bri:254,
		hue:14910,
		sat:144,
		effect:"none",
		xy: [
		    0.4596,
		    0.4105
		],
		ct:370,
		alert:"none",
		colormode:"ct",
		reachable:false
	    },
	    'type':"Extended color light",
	    name:"Chambre Julien",
	    modelid:"LCT007",
	    manufacturername:"Philips",
	    uniqueid:"00:17:88:01:10:26:68:63-0b",
	    swversion:"5.38.1.14919"
	}
    },
    groups: <{ [idx: string]: Group }>{
	"1": <Group>{
	    name: 'Salon',
	    lights: ["1"],
	    'type': 'Room',
	    state: <GroupState>{
		all_on: true,
		any_on: true
	    },
	    'class': 'Living room',
	    action: <LightState>{
		on: true,
		bri: 144,
		hue: 13524,
		sat: 200,
		effect: 'none',
		xy: [
		    0.5017,
		    0.4152
		],
		ct: 443,
		alert: 'none',
		colormode: 'xy'
	    }
	},
	"2": <Group>{
	    name:"Salle à manger",
	    lights:["2"],
	    'type':"Room",
	    state: <GroupState>{
		all_on:true,
		any_on:true
	    },
	    'class':"Dining",
	    action: <LightState>{
		on:true,
		bri:254,
		hue:14957,
		sat:141,
		effect:"none",
		xy: [
		    0.4576,
		    0.4099
		],
		ct:365,
		alert:"none",
		colormode:"xy"
	    }
	},
	"3": <Group>{
	    name:"Chambre Julien",
	    lights:["3"],
	    'type':"Room",
	    state: <GroupState>{
		all_on:true,
		any_on:true
	    },
	    'class':"Bedroom",
	    action: <LightState>{
		on:true,
		bri:254,
		hue:14910,
		sat:144,
		effect:"none",
		xy: [
		    0.4596,
		    0.4105
		],
		ct:370,
		alert:"none",
		colormode:"ct"
	    }
	},
	"4": <Group>{
	    name:"Séjour",
	    lights:["1","2"],
	    'type':"LightGroup",
	    state: <GroupState>{
		all_on:true,
		any_on:true
	    },
	    'class':null,
	    recycle:false,
	    action: <LightState>{
		on:true,
		bri:254,
		hue:14957,
		sat:141,
		effect:"none",
		xy: [
		    0.4576,
		    0.4099
		],
		ct:365,
		alert:"none",
		colormode:"xy"
	    }
	}
    },
    schedules: <{ [idx: string]: Schedule }>{
	"1": <Schedule>{
	    name:"Réveil 1",
	    description:"L_04_Kzsh4_start wake up",
	    command: <Command>{
		address:"/api/26f8577d4a3c65871eff5d0162873c44/sensors/6/state",
		body: {
		    flag:true
		},
		method:"PUT"
	    },
	    localtime:"W124/T07:10:00",
	    time:"W124/T06:10:00",
	    created:"2016-10-19T18:38:44",
	    status:"disabled",
	    recycle:false
	},
	"2": <Schedule>{
	    name:"L_04_Kzsh4",
	    description:"L_04_Kzsh4_trigger end scene",
	    command: <Command>{
		address:"/api/26f8577d4a3c65871eff5d0162873c44/groups/0/action",
		body: {
		    scene:"aY4eBzLYDJFMPWY"
		},
		method:"PUT"
	    },
	    localtime:"PT00:01:00",
	    time:"PT00:01:00",
	    created:"2016-09-17T09:09:45",
	    status:"disabled",
	    autodelete:false,
	    starttime:"2016-10-19T05:10:00",
	    recycle:false
	},
	"4": <Schedule>{
	    name:"Réveil 7h20 1/2",
	    description:"",
	    command: <Command>{
		address:"/api/aTq7-EVOKVzCtIc5QW6wN5m-Ojus9nmiT0W5cPuI/groups/3/action",
		body: {
		    on:true,
		    bri:1,
		    xy: [
			0.9,
			0.1
		    ]
		},
		method:"PUT"
	    },
	    localtime:"W124/T07:00:00",
	    time:"W124/T06:00:00",
	    created:"2016-10-23T09:44:25",
	    status:"enabled",
	    recycle:false
	},
	"5": <Schedule>{
	    name:"Reveil 7h20 2/2",
	    description:"",
	    command: <Command>{
		address:"/api/aTq7-EVOKVzCtIc5QW6wN5m-Ojus9nmiT0W5cPuI/groups/3/action",
		//address:"http://www.google.fr/",
		body: {
		    on:true,
		    bri:254,
		    xy: [
			0.35,
			0.35
		    ],
		    transitiontime:11400
		},
		method:"PUT"
	    },
	    localtime:"W124/T07:01:00",
	    time:"W124/T06:01:00",
	    created:"2016-10-23T09:48:09",
	    status:"enabled",
	    recycle:false
	}
    },
    scenes: <{ [idx: string]: Scene }>{
	"D-k60Rec5FirJ6Q": {
	    name:"Détente",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data:"ESnk5_r01_d01"
	    },
	    picture:"",
	    lastupdated:"2016-10-19T19:46:20",
	    version:2,
	    lightstates: null
	},
	"MnGdyB00c-D6pnF": {
	    name:"Lecture",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data:"XcXQi_r01_d02"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:56",
	    version:2,
	    lightstates: null
	},
	"Z96AqzAhxx3rMHW": {
	    name:"Aurore boréale",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data:"R60Jt_r01_d17"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:57",
	    version:2,
	    lightstates: null
	},
	"zvxHQB7jbYeW07u": {
	    name:"Coucher sur la savane",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data:"EaUzd_r01_d15"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:52",
	    version:2,
	    lightstates: null
	},
	"nRI-dwBj63z5Th2": {
	    name:"Lumineux",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data:"dp3Eb_r01_d05"
	    },
	    picture:"",
	    lastupdated:"2016-10-18T17:10:00",
	    version:2,
	    lightstates: null
	},
	"2CqnKn7frXuHfnk": {
	    name:"Crépuscule tropical",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data:"eEFUK_r01_d16"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:52",
	    version:2,
	    lightstates: null
	},
	"nB1MtVjBRnuEAAm": {
	    name:"Concentration",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data:"efF7d_r01_d03"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:56",
	    version:2,
	    lightstates: null
	},
	"S36sCk80qNZJRRj": {
	    name:"Printemps Floral",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "AnPrf_r01_d18"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:56",
	    version:2,
	    lightstates: null
	},
	"W2hXb-pJOL8bYcI": {
	    name:"Stimulation",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "7Jjxi_r01_d04"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:56",
	    version:2,
	    lightstates: null
	},
	"G-YDFqwFCpOAixt": {
	    name:"Atténué",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "LDppQ_r01_d06"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:56",
	    version:2,
	    lightstates: null
	},
	"U9EpvMiVV8UHZpR": {
	    name:"Veilleuse",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "XeO1u_r01_d07"
	    },
	    picture:"",
	    lastupdated:"2016-10-18T16:34:03",
	    version:2,
	    lightstates: null
	},
	"TbINsTHl9nTje01": {
	    name:"Extinction",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "x0mlg_r01_d19"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:49:55",
	    version:2,
	    lightstates: null
	},
	"8uxTvnkTNHP3zyn": {
	    name:"Coucher sur la savane",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "8Ta42_r02_d15"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"CYnP8TbwuvDe1ya": {
	    name:"Crépuscule tropical",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "PwBld_r02_d16"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"a7meS5QFZcnaDyx": {
	    name:"Aurore boréale",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "9oK2W_r02_d17"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"JX5I-gjR8fsWS13": {
	    name:"Printemps Floral",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "vP5Jy_r02_d18"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"te5vJnxpz2ST4s7": {
	    name:"Détente",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "8t1p7_r02_d01"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"IGSJXJr4gZYirPB": {
	    name:"Lecture",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "luOBU_r02_d02"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"Xg1p09Hgr97uLyl": {
	    name:"Concentration",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "maK5i_r02_d03"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"7tm7Vjlu5jQVJ9z": {
	    name:"Atténué",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "a8Hzb_r02_d06"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"hPO9u2p1miRJYsO": {
	    name:"Lumineux",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "PVFWf_r02_d05"
	    },
	    picture:"",
	    lastupdated:"2016-10-19T19:46:20",
	    version:2,
	    lightstates: null
	},
	"H1y14pak7OsLlXu": {
	    name:"Stimulation",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "fCM5t_r02_d04"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"iBNNi5NpzdvTGXX": {
	    name:"Veilleuse",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "jm8xF_r02_d07"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:50:00",
	    version:2,
	    lightstates: null
	},
	"aPGKBmAyLzZ0bKV": {
	    name:"Extinction",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "pBCWQ_r02_d19"
	    },
	    picture:"",
	    lastupdated:"2016-09-13T16:52:00",
	    version:2,
	    lightstates: null
	},
	"Rp021onc0oBv-x0": {
	    name:"Coucher sur la savane",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "ixIO7_r03_d15"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"gClPJ1XDVwyW4Wm": {
	    name:"Aurore boréale",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "TpXVc_r03_d17"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"61bq7rnJNmj9epF": {
	    name:"Crépuscule tropical",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "80KG9_r03_d16"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"ebuSy2N6Hg0AZ5j": {
	    name:"Détente",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "C4Vvs_r03_d01"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"Z0JuMPC7HpgRBkH": {
	    name:"Printemps Floral",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "C0ugS_r03_d18"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"ZSeQCWO2szS4f4q": {
	    name:"Lecture",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "prWTU_r03_d02"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"L9K6fMVsLPps4Fc": {
	    name:"Concentration",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "XUCQP_r03_d03"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"fvUm4Lx2IRrIfVs": {
	    name:"Stimulation",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "KgSZI_r03_d04"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"eMlwUu5fQERKEoM": {
	    name:"Atténué",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "lJKQC_r03_d06"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"cXbxIZwO40V1ir-": {
	    name:"Lumineux",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "MzBjC_r03_d05"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"GFuV5msTWPHDlTV": {
	    name:"Veilleuse",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:false,
	    locked:false,
	    appdata: <AppData>{
		version:1,
		data: "p5XDy_r03_d07"
	    },
	    picture:"",
	    lastupdated:"2016-09-15T19:29:56",
	    version:2,
	    lightstates: null
	},
	"I2tazOG6WFSQWgO": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:10:41",
	    version:2,
	    lightstates: null
	},
	"JjOAL48O3fOA7-m": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:10:41",
	    version:2,
	    lightstates: null
	},
	"sM2FQjNjfM6ugpl": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:32:33",
	    version:2,
	    lightstates: null
	},
	"S9q4XHLWlLYPh7K": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:32:34",
	    version:2,
	    lightstates: null
	},
	"GcLYMplVLeMtaXv": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:32:52",
	    version:2,
	    lightstates: null
	},
	"VZnp3f6c5wi-UNe": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:32:52",
	    version:2,
	    lightstates: null
	},
	"NPZOLntGQjTHZWz": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:33:22",
	    version:2,
	    lightstates: null
	},
	"TO8nqJ9LvxD-J9b": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:33:22",
	    version:2,
	    lightstates: null
	},
	"OOSHuVmdwrtoXIg": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:33:36",
	    version:2,
	    lightstates: null
	},
	"sxdPUd3QmA2tzMV": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-15T21:33:36",
	    version:2,
	    lightstates: null
	},
	"YSKmgbV8lh0rC1m": {
	    name:"Wake Up init",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:09:44",
	    version:2,
	    lightstates: null
	},
	"aY4eBzLYDJFMPWY": {
	    name:"Wake Up end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:09:44",
	    version:2,
	    lightstates: null
	},
	"Onn5jKQGFANbLQG": {
	    name:"Go to sleep start",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:10:59",
	    version:2,
	    lightstates: null
	},
	"FxHjOSz7jjqjsUv": {
	    name:"Go to sleep end",
	    lights:["3"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:false,
	    appdata:null,
	    picture:"",
	    lastupdated:"2016-09-17T09:10:59",
	    version:2,
	    lightstates: null
	},
	"vvhMozy6WiYjQtu": {
	    name:"Recover room 1",
	    lights:["1"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "hNTSZ_r01_h01"
	    },
	    picture:"",
	    lastupdated:"2016-11-05T06:39:47",
	    version:2,
	    lightstates: null
	},
	"PKHMPcLT0krWNu6": {
	    name:"Recover room 2",
	    lights:["2"],
	    owner:"26f8577d4a3c65871eff5d0162873c44",
	    recycle:true,
	    locked:true,
	    appdata: <AppData>{
		version:1,
		data: "ramUK_r02_h01"
	    },
	    picture:"",
	    lastupdated:"2016-11-05T06:39:47",
	    version:2,
	    lightstates: null
	}
    },
    config: <BridgeConfig>{
	name: "Ping's Bridge",
	zigbeechannel: 15,
	bridgeid: '001788FFFE28DF9B',
	mac: '00:17:88:28:df:9b',
	dhcp: true,
	ipaddress: '192.168.239.137',
	netmask: '255.255.255.0',
	gateway: '192.168.239.254',
	proxyaddress: null,
	proxyport: 0,
	UTC: '2016-10-19T20:44:23',
	localtime: '2016-10-19T22:44:23',
	timezone: 'Europe/Paris',
	modelid: 'BSB002',
	swversion: '01035934',
	apiversion: '1.15.0',
	linkbutton: false,
	portalservices: false,
	portalconnection: 'connected',
	factorynew: false,
	replacesbridgeid: null
    }
};
