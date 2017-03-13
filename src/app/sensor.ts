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
export class SensorState {
    buttonevent: number;
    lastupdated: string;
    /*
      ZLL Temperature
     */
    temperature: number;
    /*
      ZLL Presence
     */
    presence: boolean;
    /*
      CLIP OpenClose
     */
    open: boolean;
    /*
      CLIP Humidity
     */
    humidity: number;
    /*
      Daylight Sensor
      CLIP Lightlevel
      ZLL Lightlevel
     */
    daylight: boolean;
    /*
      CLIP Lightlevel
      ZLL Lightlevel
     */
    lightlevel: number;
    /*
      CLIP Lightlevel
      ZLL Lightlevel
     */
    dark: boolean;
    /*
      CLIP Generic Flag Sensor
     */
    flag: boolean;
    /*
      CLIP Generic Status Sensor
     */
    status: number;
}

export class SensorConfig {
    on: boolean;
    configured: boolean;
    sunriseoffset: number;
    sunsetoffset: number;
    reachable: boolean;
    battery: string;
    alert: boolean;
    tholddark: number;
    tholdoffset: number;
    /*
      CLIP OpenClose
      CLIP Generic Flag Sensor
      CLIP Generic Status Sensor
     */
    url: string;
}

export class Sensor {
    state: SensorState;
    config: SensorConfig;
    name: string;
    type: string;
    modelid: string;
    manufacturername: string;
    swversion: number;
    recycle: boolean;
    swconfigid: string;
    productid: string;
    sensitivity: number;
    sensitivitymax: number;
}
