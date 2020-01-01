import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';

@Injectable()
export class DeviceDetails {
    name: string = "";
    osVersion: string = "";
    uuid: string = "";
    public deviceDetails: Device;
    constructor(public device: Device) {
        this.deviceDetails = device;
        console.log('Device UUID is: ' + this.device.uuid);
    }

    GetDeviceUUID(): string {
        return this.device.uuid;
    }

}