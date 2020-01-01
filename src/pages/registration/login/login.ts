import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestModelComponent, VerifyOTPReq } from './../../../components/request-model/request-model';
import { AuthenticationServiceProvider } from './../../../providers/authentication-service/authentication-service';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Util } from './../../../helper/util';
import { LocalStorageKeys } from './../../../helper/constants';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public otp_entered = false;
  otpDisable = false;
  verifyOtpDisable = false;
  public userID: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AuthServiceCall: AuthenticationServiceProvider, public events: Events, public alertCtrl: AlertController) {


  }

  ionViewDidLoad() {
  }

  UpdateUserID() {
    this.otpDisable = false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  async GenerateOTP(strUser_id: Number) {
    console.log(strUser_id)
    console.log("Check=>" + this.userID)
    if (strUser_id > 0) {
      this.otpDisable = true;
      var user_id = +strUser_id;
      let reqObj = new RequestModelComponent();
      reqObj.device_id = "abc";
      reqObj.os_type = "Android";
      reqObj.user_id = user_id;
      let respObj = await this.AuthServiceCall.generateOTP(reqObj);
      if (respObj.status_code == 200) {
        this.otp_entered = true;
      }
    }
    else {
      var alert = new Util(this.alertCtrl);
      alert.showAlert("Login", "Please enter valid User ID");
    }
  }

  async varifyOtp(strOTP: string, strUser_id: Number) {
    var user_id = +strUser_id;

    if (strOTP.length > 0) {
      this.verifyOtpDisable = true;
      let reqObj = new VerifyOTPReq();
      reqObj.device_id = "abc";
      reqObj.os_type = "Android";
      reqObj.otp = strOTP;
      reqObj.user_id = user_id;
      let respObj = await this.AuthServiceCall.verifyOTP(reqObj);
      if (respObj.status_code == 200) {
        localStorage.setItem(LocalStorageKeys.user_id, String(user_id));
        localStorage.setItem(LocalStorageKeys.token, respObj.token);
        localStorage.setItem(LocalStorageKeys.user_name, respObj.name);
        console.log(respObj.name);
        this.events.publish('UserName', respObj.name, Date.now());
        this.navCtrl.push('LandingPage');
      }
    } else {
      let alert = new Util(this.alertCtrl);
      alert.showAlert("Login", "Please enter OTP");
    }

  }

}
