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
