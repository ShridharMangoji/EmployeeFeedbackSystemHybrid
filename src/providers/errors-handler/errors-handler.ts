import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { Util } from './../../helper/util';
import { App } from 'ionic-angular';
import {LocalStorageKeys} from './../../helper/constants';
/*
  Generated class for the ErrorsHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorsStatusHandler {
  constructor(public app: App, public alertCtrl: AlertController) {
    console.log('');
  }
  RedirectToLoginPage() {
    let nav = this.app.getActiveNav();
    nav.setRoot("LoginPage");
  }

  ClearLocalStorage()
  {
    // localStorage.removeItem(LocalStorageKeys.token);
    // localStorage.removeItem(LocalStorageKeys.fcm_token);
    // localStorage.removeItem(LocalStorageKeys.selected_feedback_id);
    // localStorage.removeItem(LocalStorageKeys.user_id);
    // localStorage.removeItem(LocalStorageKeys.user_name);
    localStorage.clear();
  }

  public CheckForCommonStatus(statusCode: Number, statusMessage: string) {
    var alert = new Util(this.alertCtrl);
    switch (statusCode) {
      case 401:
        alert.showAlert("Server Error", statusMessage);
        this.ClearLocalStorage();
        this.RedirectToLoginPage();
        break;
      case 400:
        alert.showAlert("Client Error", statusMessage);
        break;
      case 500:
        alert.showAlert("Server Error", statusMessage);
        // this.RedirectToLoginPage();
        break;
      case 201:
        alert.showAlert("App", statusMessage);
        break;
      case 409:
        alert.showAlert("App", statusMessage);
        break;
    }
  }
}
