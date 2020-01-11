import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { LocalStorageKeys } from './../helper/constants';
import { FCM } from '@ionic-native/fcm';
import { PushNotification } from './../helper/pushNotification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  @ViewChild('content') navCtrl: NavController;
  get user_name() {
    return String(localStorage.getItem(LocalStorageKeys.user_name));
  }
  userName: string = "";
  showSubmenu: boolean = false;
  isEscalationRequired: boolean = false;



  constructor(public fcm:FCM,public events: Events,public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    events.subscribe('UserName', (user) => {
      this.userName = user;
    });
    events.subscribe('isEscalationRequired', (eventEsclationReq) => {
      console.log("Check=>" + eventEsclationReq);
      this.isEscalationRequired = eventEsclationReq;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      new PushNotification(this.platform,this.fcm,this.navCtrl).Notification();
    });
  }
  menuItemHandler() {
    this.showSubmenu = !this.showSubmenu;
  }
  openPage(pageName: any) {
    let params = {};
    switch (pageName) {
      case "List":
        this.navCtrl.push('FeedbackListPage')
        break;
      case "Addfeedback":
        this.navCtrl.push('FeedbackCreatePage')
        break;
      case "LogOut":
        this.navCtrl.setRoot('LoginPage');
        break;
      case "MyFeedback":
        {
          params = { tabIndex: 'myFeedbacks' };
          this.navCtrl.push('FeedbackListPage', params);
          break;
        }
      case "FeedbackForMe":
        {
          params = { tabIndex: "feedbacksForMe" };
          this.navCtrl.push('FeedbackListPage', params);
          break;
        }
      case "EscalationFeedback":
        {
          params = { tabIndex: "escalatedFeedback" };
          this.navCtrl.push('FeedbackListPage', params);
          break;
        }
    }
    this.menuCtrl.close();
  }
}

