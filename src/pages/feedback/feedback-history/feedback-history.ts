import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KeyValuePair } from './../../../components/response-model/response-model';
import { FeedbackServiceProvider } from './../../../providers/feedback-service/feedback-service';
import { RequestModelComponent, giveFeedback, feedbackInfo } from './../../../components/request-model/request-model';

/**
 * Generated class for the FeedbackHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-history',
  templateUrl: 'feedback-history.html',
})
export class FeedbackHistoryPage {
  get user_id() {
    return Number(localStorage.getItem("user_id"));
  }

  get selected_feedback_id() {
    return Number(localStorage.getItem("selected_feedback_id"));
  }

  public teamUserList: KeyValuePair[];
  public feedbackCategoryList: KeyValuePair[];
  public oldSubject: String;
  public oldMessage: String;
  public selectedTeamMember: KeyValuePair;
  public selectedFeedbackCategory: KeyValuePair;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public feedbackServiceCall: FeedbackServiceProvider) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackHistoryPage');
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;

    let fcRespObj = await this.feedbackServiceCall.FeedbackHistory(reqObj);
    JSON.stringify(fcRespObj);
   
   this.oldSubject = fcRespObj.feedbackDetails.subject;
    this.oldMessage = fcRespObj.feedbackDetails.message;
    let respObj = await this.feedbackServiceCall.FeedbackEscalationTeam(reqObj);
    if (respObj.status_code == 200) {
      this.teamUserList = respObj.userList;
      //this.feedbackCategoryList=fcRespObj.feedback_categories;
      // console.log("teamList is fetch "+this.teamUserList[0].name);
    }
    else {
      console.log("teamList is not fetched");
    }
  }
  escalate() {
    this.showConfirm();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            //confirm.dismiss();
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.navCtrl.push('FeedbackListPage')
          }
        }
      ]
    });
    confirm.present();
  }
}
