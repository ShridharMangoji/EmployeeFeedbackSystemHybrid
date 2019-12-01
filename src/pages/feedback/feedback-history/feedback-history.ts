import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { KeyValuePair } from './../../../components/response-model/response-model';
import { FeedbackServiceProvider } from './../../../providers/feedback-service/feedback-service';
import { RequestModelComponent, giveFeedback, feedbackInfo, FeedbackEscalationMapping } from './../../../components/request-model/request-model';

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
  public oldCategory: String;
  public oldCreatedFor: String;
  public subject: String;
  public message: String;
  public selectedTeamMember: Number;
  public selectedFeedbackCategory: KeyValuePair;
  public feedbackEscalatedMessages: FeedbackEscalationMapping[];
  public is_escalated_messages = false;
  public is_escalation_required = false;
  public escalateReq = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public feedbackServiceCall: FeedbackServiceProvider) {
  }

  escalateFeedBack()
  {
    this.escalateReq=true;
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackHistoryPage');
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;

    let fcRespObj = await this.feedbackServiceCall.FeedbackHistory(reqObj);
    if (fcRespObj.feedbackEscalationHistory!=null||fcRespObj.feedbackEscalationHistory.length > 0) {
      this.is_escalated_messages = true;
      this.feedbackEscalatedMessages = fcRespObj.feedbackEscalationHistory;
    }
    if (fcRespObj.isEscalationAllowed == true) {
      this.is_escalation_required = true;
    }

    this.oldSubject = fcRespObj.feedbackDetails.subject;
    this.oldMessage = fcRespObj.feedbackDetails.message;
    this.oldCategory= fcRespObj.feedbackDetails.feedbackCategoryName;
    this.oldCreatedFor= fcRespObj.feedbackDetails.createdForName;
    let respObj = await this.feedbackServiceCall.teamList(reqObj);
    if (respObj.status_code == 200) {
      this.teamUserList = respObj.userList;
      //this.feedbackCategoryList=fcRespObj.feedback_categories;
      // console.log("teamList is fetch "+this.teamUserList[0].name);
    }
    else {
      console.log("teamList is not fetched");
    }
  }

  async escalateFeedback() {

    let reqObj = new giveFeedback();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_info = new feedbackInfo();
    reqObj.feedback_info.Message = this.message;
    reqObj.feedback_info.Subject = this.subject;
    reqObj.feedback_info.CreatedFor = this.selectedTeamMember;
    //reqObj.feedback_info.FeedbackCategoryId = this.selectedFeedbackCategory.id;
    reqObj.feedback_info.CreatedBy = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;
    reqObj.feedback_info.Id = this.selected_feedback_id;
    reqObj.feedback_info.StatusId = 2;
    let respObj = await this.feedbackServiceCall.giveFeedback(reqObj);
    if(respObj.status_code=200)
    {
      this.navCtrl.push('LandingPage');
    }

  }

  escalate() {
    this.showConfirm();
  }

  async CloseLead() {
    let reqObj = new giveFeedback();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_info = new feedbackInfo();
    // reqObj.feedback_info.Message=this.message;
    // reqObj.feedback_info.Subject=this.subject;
    //reqObj.feedback_info.CreatedFor = this.selectedTeamMember.id;
    // reqObj.feedback_info.FeedbackCategoryId = this.selectedFeedbackCategory.id;
    // reqObj.feedback_info.CreatedBy = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;
    reqObj.feedback_info.Id = this.selected_feedback_id;
    reqObj.feedback_info.StatusId = 3;
    console.log(this.selected_feedback_id);
    let respObj = await this.feedbackServiceCall.giveFeedback(reqObj);
    if (respObj.status_code = 200) {
      this.navCtrl.push('LandingPage')
    }
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Do you want to submit?',
      message: 'Are you sure, You want to submit this feedback?',
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
            this.escalateFeedback();
          }
        }
      ]
    });
    confirm.present();
  }
}
