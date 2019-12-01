import { Component, ViewChild,NgZone } from '@angular/core';
import { Platform ,NavController,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  @ViewChild('content') navCtrl: NavController;
  get user_name() {
    return String(localStorage.getItem("user_name"));
   }
   userName:string="";
  constructor(public events: Events,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl:MenuController) {
    events.subscribe('UserName', (user, time) => {

      // user and time are the same arguments passed in `events.publish(user, time)`
      this.userName=user;
    });
    platform.ready().then(() => {
      

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    
  }
 
  openPage(pageName: any){
    switch(pageName)
    {
      case "List":
          this.navCtrl.push('FeedbackListPage')
      break;
      case "Addfeedback":
          this.navCtrl.push('FeedbackCreatePage')
      break;
      case "LogOut":
          this.navCtrl.setRoot('LoginPage');
      break;
    }
    this.menuCtrl.close();
  }
}

