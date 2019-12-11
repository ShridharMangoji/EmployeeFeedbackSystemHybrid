import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestModelComponent, VerifyOTPReq } from './../../../components/request-model/request-model';
import { AuthenticationServiceProvider } from './../../../providers/authentication-service/authentication-service';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Util} from './../../../helper/util';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AuthServiceCall: AuthenticationServiceProvider, public events: Events, public alertCtrl: AlertController
  ) {


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  

  async GenerateOTP(strUser_id: Number) {
    console.log(strUser_id)
    if (strUser_id > 0) {
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
      var alert=new Util(this.alertCtrl);
      alert.showAlert("Login", "Please enter valid User ID");
    }
  }

  async varifyOtp(strOTP: string, strUser_id: Number) {
    var user_id = +strUser_id;
    let reqObj = new VerifyOTPReq();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.otp = strOTP;
    reqObj.user_id = user_id;
    let respObj = await this.AuthServiceCall.verifyOTP(reqObj);
    if (respObj.status_code == 200) {
      localStorage.setItem("user_id", String(user_id));
      localStorage.setItem("token", respObj.token);
      localStorage.setItem("user_name", respObj.name);
      console.log(respObj.name);
      this.events.publish('UserName', respObj.name, Date.now());
      this.navCtrl.push('LandingPage');
    }
    else {

    }

  }

}
