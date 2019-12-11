import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, MenuController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import {PassingParameter} from './../helper/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  @ViewChild('content') navCtrl: NavController;
  get user_name() {
    return String(localStorage.getItem("user_name"));
  }
  userName: string = "";
  showSubmenu: boolean = false;
  isEscalationRequired: boolean = false;



  constructor(public events: Events, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController) {
    events.subscribe('UserName', (user, time) => {
      this.userName = user;
    });
    events.subscribe('isEscalationRequired', (eventEsclationReq, time) => {
      console.log("Check=>" + eventEsclationReq);
      this.isEscalationRequired = eventEsclationReq;
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });



  }
  menuItemHandler() {
    this.showSubmenu = !this.showSubmenu;
  }
  openPage(pageName: any) {
    let params={};
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
          //let tabName="myFeedbacks";
          params={tabIndex:'myFeedbacks'};
          this.navCtrl.push('FeedbackListPage',params);
          break;
        }
      case "FeedbackForMe":
        {
          params={tabIndex:"feedbacksForMe"};
        //  PassingParameter.tabNavigation="feedbacksForMe";
         // this.events.publish("SectionToBeSelected", "feedbacksForMe");
         this.navCtrl.push('FeedbackListPage',params);
          break;
        }
      case "EscalationFeedback":
        {
          params={tabIndex:"escalatedFeedback"};
          //this.events.publish("SectionToBeSelected", "escalatedFeedback");
          this.navCtrl.push('FeedbackListPage',params);
          break;
        }
    }
    this.menuCtrl.close();
  }
}

