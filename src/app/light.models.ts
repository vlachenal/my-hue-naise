import { LightState } from './light';

export class Gamut {
    red: number[];
    green: number[];
    blue: number[];

    fromRGB(color: string): LightState {
	// Retrieve red/green/blue values +
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
	if(!result) {
	    return null;
	}
	let r: number = parseInt(result[1], 16) / 255;
	let g: number = parseInt(result[2], 16) / 255;
	let b: number = parseInt(result[3], 16) / 255;
	// Retrieve red/green/blue values -
	// Apply gamma correction +
	r = (r > 0.04045) ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : (r / 12.92);
	g = (g > 0.04045) ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : (g / 12.92);
	b = (b > 0.04045) ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : (b / 12.92);
	// Apply gamma correction -
	// Convert to XYZ +
	let X: number = r * 0.664511 + g * 0.154324 + b * 0.162028;
	let Y: number = r * 0.283881 + g * 0.668433 + b * 0.047685;
	let Z: number = r * 0.000088 + g * 0.072310 + b * 0.986039;
	// Convert to XYZ -
	// Calculate xy value +
	let x: number = X / (X + Y + Z);
	let y: number = Y / (X + Y + Z);
	// Calculate xy value -
	if(!this.isValid([x,y])) {
	    let point: number[] = this.getClosestXY([x,y]);
	    x = point[0];
	    y = point[1];
	}
	let state: LightState = new LightState();
	state.xy = [x,y];
	state.bri = Math.ceil(Y * 254);
	return state;
    }

    isValid(point: number[]): boolean {
	let v1: number[] = [
	    this.green[0] - this.red[0],
	    this.green[1] - this.red[1]
	];
	let v2: number[] = [
	    this.blue[0] - this.red[0],
	    this.blue[1] - this.red[1]
	];
	let v12 = v1[0] * v2[1] - v1[1] * v2[0];
	let q: number[] = [
	    point[0] - this.red[0],
	    point[1] - this.red[1]
	];
	let s: number = (q[0] * v2[1] - q[1] * v2[0]) / v12;
	let t: number = (v1[0] * q[1] - v1[1] * q[0]) / v12;
	return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
    }

    getClosestPointToPoints(a: number[], b: number[], p: number[]): number[] {
	let ap: number[] = [
	    p[0] - a[0],
	    p[1] - a[1]
	];
	let ab: number[] = [
	    b[0] - a[0],
	    b[1] - a[1]
	];
	let ab2: number = ab[0] * ab[0] + ab[1] * ab[1];
	let ap_ab: number = ap[0] * ab[0] + ap[1] * ab[1];
	let t: number = ap_ab / ab2;
	if(t < 0.0) {
            t = 0.0;
	} else if(t > 1.0) {
            t = 1.0;
	}
	return [a[0] + ab[0] * t, a[1] + ab[1] * t];
    }

    getDistanceBetweenTwoPoints(a: number[], b: number[]): number {
	let dx: number = a[0] - b[0]; // horizontal difference
	let dy: number = a[1] - b[1]; // vertical difference
	return Math.sqrt(dx * dx + dy * dy);
    }

    getClosestXY(xy: number[]): number[] {
	let pAB: number[] = this.getClosestPointToPoints(this.red, this.green, xy);
	let pAC: number[] = this.getClosestPointToPoints(this.blue, this.red, xy);
	let pBC: number[] = this.getClosestPointToPoints(this.green, this.blue, xy);
	let dAB: number = this.getDistanceBetweenTwoPoints(xy, pAB);
	let dAC: number = this.getDistanceBetweenTwoPoints(xy, pAC);
	let dBC: number = this.getDistanceBetweenTwoPoints(xy, pBC);
	let lowest: number = dAB;
	let point: number[] = pAB;
	if(dAC < lowest) {
            lowest = dAC;
            point = pAC;
        }
        if(dBC < lowest) {
            lowest = dBC;
            point = pBC;
        }
	return point;
    }

    toHex(value: number): string {
	if(value < 0) {
	    console.debug("Value is inferior to 0: " + value);
	    return "00";
	}
	let res: string = Math.ceil(value * 255).toString(16);
	while(res.length < 2) {
	    res = "0" + res;
	}
	return res;
    }

    toRGB(xy: number[], bri: number): string {
	let XY: number[] = xy;
	if(!this.isValid(XY)) {
	    console.debug("Invalid color xy=" + xy + " ; bri=" + bri);
	    XY = this.getClosestXY(xy);
	}
	// Calculate XYZ values +
	let Y: number = bri;
	let X: number = (Y / XY[1]) * XY[0];
	let Z: number = (Y / XY[1]) * (1.0 - XY[0] - XY[1]);
	// Calculate XYZ values -
	// Convert to RGB values +
	let r: number =  X * 1.656492 - Y * 0.354851 - Z * 0.255038;
	let g: number = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
	let b: number =  X * 0.051713 - Y * 0.121364 + Z * 1.011530;
	if(r > b && r > g && r > 1.0) { // red is too big
            g = g / r;
            b = b / r;
            r = 1.0;
	} else if(g > b && g > r && g > 1.0) { // green is too big
            r = r / g;
            b = b / g;
            g = 1.0;
	} else if(b > r && b > g && b > 1.0) { // blue is too big
            r = r / b;
            g = g / b;
            b = 1.0;
	}
	r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
	g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
	b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
	if(r > b && r > g) { // red is biggest
            if(r > 1.0) {
		g = g / r;
		b = b / r;
		r = 1.0;
            }
	} else if(g > b && g > r) { // green is biggest
            if(g > 1.0) {
		r = r / g;
		b = b / g;
		g = 1.0;
            }
	} else if(b > r && b > g) { // blue is biggest
            if(b > 1.0) {
		r = r / b;
		g = g / b;
		b = 1.0;
            }
	}
	// Convert to RGB values -
	return "#" + this.toHex(r) + this.toHex(g) + this.toHex(b);
    }

}

let gamutA = new Gamut();
gamutA.red = [0.704, 0.296];
gamutA.green = [0.2151, 0.7106];
gamutA.blue = [0.138, 0.08];

let gamutB = new Gamut();
gamutB.red = [0.675, 0.322];
gamutB.green = [0.409, 0.518];
gamutB.blue = [0.167, 0.04];

let gamutC = new Gamut();
gamutC.red = [0.692, 0.308];
gamutC.green = [0.17, 0.7];
gamutC.blue = [0.153, 0.048];

export const DEFAULT_GAMUT = new Gamut();
gamutC.red = [1.0, 0.0];
gamutC.green = [0.0, 1.0];
gamutC.blue = [0.0, 0.0];

export const MODELS: Map<string,Gamut> = new Map<string,Gamut>();
MODELS['LCT001'] = gamutB;
MODELS['LCT007'] = gamutB;
MODELS['LCT010'] = gamutC;
MODELS['LCT014'] = gamutC;
MODELS['LCT002'] = gamutB;
MODELS['LCT003'] = gamutB;
MODELS['LCT011'] = gamutC;
MODELS['LST001'] = gamutA;
MODELS['LLC010'] = gamutA;
MODELS['LLC011'] = gamutA;
MODELS['LLC012'] = gamutA;
MODELS['LLC006'] = gamutA;
MODELS['LLC007'] = gamutA;
MODELS['LLC013'] = gamutA;
MODELS['LLM001'] = gamutB;
MODELS['LLC020'] = gamutC;
MODELS['LST002'] = gamutC;
