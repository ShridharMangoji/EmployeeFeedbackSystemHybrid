import { FCM, NotificationData } from '@ionic-native/fcm';
import { Platform, NavController } from 'ionic-angular';

import { constants, LocalStorageKeys } from './../helper/constants';

export class PushNotification {
    constructor(public platform: Platform, public fcm: FCM,public navCtrl: NavController, ) { }

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
                    console.log("Received in background" + JSON.stringify(data));
                   
                } else {
                    console.log("Received in foreground" + JSON.stringify(data));
                };
                this.OnClickPushNotification(data);
            });
        }
    }

    OnClickPushNotification(data: NotificationData) {
        let params = { feedbackID: data.id, notificationType: data.type };
        this.navCtrl.push('FeedbackHistoryPage', params);
    }
}