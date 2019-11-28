import { Component, ViewChild } from '@angular/core';
import { Platform ,NavController,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  @ViewChild('content') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menuCtrl:MenuController) {
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

