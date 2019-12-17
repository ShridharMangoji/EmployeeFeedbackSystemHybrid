import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constants } from "./../../helper/constants";
import {
  replyReq,
  RequestModelComponent,
  giveFeedback
} from "./../../components/request-model/request-model";
import {
  ResponseModelComponent,
  TeamListResponse,
  feedbackCategoryResponse,
  FeedbackHistoryResp,
  FeedbackDetailListResp
} from "./../../components/response-model/response-model";

import { AlertController } from "ionic-angular";
import { Util } from "./../../helper/util";
import { App } from "ionic-angular";
import { ErrorsStatusHandler } from "./../errors-handler/errors-handler";

/*
  Generated class for the FeedbackServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedbackServiceProvider {
  constructor(public app: App,
    public http: HttpClient,
    public alertCtrl: AlertController) {
    console.log("Hello FeedbackServiceProvider Provider");
  }

  async teamList(body: RequestModelComponent): Promise<TeamListResponse> {
    let requestURL = constants.BaseURL + constants.TeamList;
    debugger;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<TeamListResponse>(requestURL, requestBody, options)
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

  FeedbackDetailList(
    body: RequestModelComponent
  ): Promise<FeedbackDetailListResp> {
    let requestURL = constants.BaseURL + "Feedback/FeedbackDetailList";
    debugger;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    let resp = this.http
      .post<FeedbackDetailListResp>(requestURL, requestBody, options)
      .toPromise()//;
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
  
  public FeedbackDetailListv2(
    body: RequestModelComponent
  ): Promise<FeedbackDetailListResp> {
    let requestURL = constants.BaseURL + "Feedback/FeedbackDetailList";
    debugger;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    let resp = this.http
      .post<FeedbackDetailListResp>(requestURL, requestBody, options)
      .toPromise()//;
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
  async FeedbackEscalationTeam(
    body: RequestModelComponent
  ): Promise<TeamListResponse> {
    let requestURL = constants.BaseURL + constants.EscalatedUserList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<TeamListResponse>(requestURL, requestBody, options)
      .toPromise()//;
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

  async feedbackCategoryList(
    body: RequestModelComponent
  ): Promise<feedbackCategoryResponse> {
    let requestURL = constants.BaseURL + constants.FeedbackCategory;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<feedbackCategoryResponse>(requestURL, requestBody, options)
      .toPromise()//;
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

  async FeedbackHistory(
    body: RequestModelComponent
  ): Promise<FeedbackHistoryResp> {
    let requestURL = constants.BaseURL + constants.FeedbackHistory;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<FeedbackHistoryResp>(requestURL, requestBody, options)
      .toPromise()//;
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

  async giveFeedback(body: giveFeedback): Promise<ResponseModelComponent> {
    let requestURL = constants.BaseURL + constants.UpdateFeedback;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<ResponseModelComponent>(requestURL, requestBody, options)
      .toPromise()//;
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

  async Reply(body: replyReq): Promise<ResponseModelComponent> {
    let requestURL = constants.BaseURL + constants.ReplyToFeedback;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = { headers: headers };
    const resp = await this.http
      .post<ResponseModelComponent>(requestURL, requestBody, options)
      .toPromise()//;
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
