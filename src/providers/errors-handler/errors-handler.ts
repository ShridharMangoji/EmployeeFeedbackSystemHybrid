import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';
import { Util } from './../../helper/util';
import { App } from 'ionic-angular'
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
  public CheckForCommonStatus(statusCode: Number, statusMessage: string) {
    var alert = new Util(this.alertCtrl);
    switch (statusCode) {
      case 401:
        alert.showAlert("Server Error", statusMessage);
        this.RedirectToLoginPage();
        break;
      case 400:
        alert.showAlert("Client Error", statusMessage);
        break;
      case 500:
        alert.showAlert("Server Error", statusMessage);
        this.RedirectToLoginPage();
        break;
      case 201:
        alert.showAlert("App", statusMessage);
        break;
    }
  }
}
