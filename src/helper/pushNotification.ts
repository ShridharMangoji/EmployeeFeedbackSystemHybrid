import { FCM } from '@ionic-native/fcm';
import { Platform } from 'ionic-angular';

import { constants, LocalStorageKeys } from './../helper/constants';

export class PushNotification {
    constructor(public platform: Platform, public fcm: FCM) { }

    GenerateToken(): string {
        let strToken: string;
        if (constants.Android) {
            this.fcm.getToken().then(token => {
                localStorage.setItem(LocalStorageKeys.fcm_token, token);
            });
        }
        else {
            localStorage.setItem(LocalStorageKeys.fcm_token, "webToken");
            strToken = "webToken";
        }
        return strToken;
    }


    Notification() {
        if (constants.Android) {
            this.fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                    console.log("Received in background" + data);
                } else {
                    console.log("Received in foreground" + data);
                };
            });
        }
    }
}