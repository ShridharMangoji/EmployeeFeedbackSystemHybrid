import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constants } from "./../../helper/constants";
import { RequestModelComponent, VerifyOTPReq } from "./../../components/request-model/request-model";
import { ResponseModelComponent, EscalatedUserListResp, VerifyOTPResp, FeedbackListResponse } from "./../../components/response-model/response-model";
import { AlertController } from "ionic-angular";
import { Util } from "./../../helper/util";
import { App } from "ionic-angular";
import { ErrorsStatusHandler } from "./../errors-handler/errors-handler";
import { HttpUtil } from "./../../helper/httpUtil";

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationServiceProvider {
  constructor(public app: App, public http: HttpClient, public alertCtrl: AlertController) {
    console.log("Hello AuthenticationServiceProvider Provider");
  }

  async escalationUserListCall(body: RequestModelComponent): Promise<EscalatedUserListResp> {
    HttpUtil.DefaultParameter(body);
    let requestURL = constants.BaseURL + constants.EscalatedUserList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http.post<EscalatedUserListResp>(requestURL, requestBody, options).toPromise()
      .then(
        res => {
          console.log(res);
          new ErrorsStatusHandler(
            this.app,
            this.alertCtrl
          ).CheckForCommonStatus(res.status_code, res.status_message);
          return res;
        },
        msg => {
          console.log(msg);
          var alert = new Util(this.alertCtrl);
          alert.showAlert("Server Error", "Error communicating to server");
          return msg;
        }
      );
    return resp;
  }

  async escalationUserFeedbackListCall(body: RequestModelComponent): Promise<FeedbackListResponse> {
    HttpUtil.DefaultParameter(body);
    let requestURL = constants.BaseURL + constants.FeedbackList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<FeedbackListResponse>(requestURL, requestBody, options)
      .toPromise() //;
      .then(
        res => {
          console.log(res);
          new ErrorsStatusHandler(
            this.app,
            this.alertCtrl
          ).CheckForCommonStatus(res.status_code, res.status_message);
          return res;
        },
        msg => {
          console.log(msg);
          var alert = new Util(this.alertCtrl);
          alert.showAlert("Server Error", "Error communicating to server");
          //this.RedirectToLoginPage();
          return msg;
        }
      );
    return resp;
  }

  RedirectToLoginPage() {
    let nav = this.app.getActiveNav();
    nav.setRoot("LoginPage");
  }

  async generateOTP(body: RequestModelComponent): Promise<ResponseModelComponent> {
    let requestURL = constants.BaseURL + constants.GenerateOTP;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    return await this.http
      .post<ResponseModelComponent>(requestURL, requestBody, options).toPromise()
      .then(
        res => {
          console.log(res);
          new ErrorsStatusHandler(
            this.app,
            this.alertCtrl
          ).CheckForCommonStatus(res.status_code, res.status_message);
          return res;
        },
        msg => {
          console.log(msg);
          var alert = new Util(this.alertCtrl);
          alert.showAlert("Server Error", "Error communicating to server");
          return msg;
        }
      );
  }

  async verifyOTP(body: VerifyOTPReq): Promise<VerifyOTPResp> {
    let requestURL = constants.BaseURL + constants.VerifyOTP;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<VerifyOTPResp>(requestURL, requestBody, options).toPromise()
      .then(
        res => {
          console.log(res);
          new ErrorsStatusHandler(
            this.app,
            this.alertCtrl
          ).CheckForCommonStatus(res.status_code, res.status_message);
          return res;
        },
        msg => {
          console.log(msg);
          var alert = new Util(this.alertCtrl);
          alert.showAlert("Server Error", "Error communicating to server");
          //this.RedirectToLoginPage();
          return msg;
        }
      );
    return resp;
  }
}
