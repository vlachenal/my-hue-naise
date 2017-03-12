/*
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
import { StateRequest } from './state-request';

export class AppData {
    version: number;
    data: string;
}

export class Scene {
    name: string;
    lights: string[];
    owner: string;
    recycle: boolean;
    locked: boolean;
    appdata: AppData;
    picture: string;
    lastupdated: string;
    version: number;
    lightstates: { [id: string]: StateRequest };
}
