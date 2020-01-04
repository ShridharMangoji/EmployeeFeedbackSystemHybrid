import { FCM } from '@ionic-native/fcm/ngx';

export class PushNotification {
    constructor(private fcm: FCM) { }

    GenerateToken(): any {
        this.fcm.getToken().then(token => {
            return token;
        });
    }

   
    Notification() {
        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                console.log("Received in background" + data);
            } else {
                console.log("Received in foreground" + data);
            };
        });

    }
}