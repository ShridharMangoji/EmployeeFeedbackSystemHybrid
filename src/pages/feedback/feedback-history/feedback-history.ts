import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import {
  KeyValuePair,
  FeedbackReplyModel
} from "./../../../components/response-model/response-model";
import { FeedbackServiceProvider } from "./../../../providers/feedback-service/feedback-service";
import {
  replyReq,
  RequestModelComponent,
  giveFeedback,
  feedbackInfo,
  FeedbackEscalationMapping,
  feedback
} from "./../../../components/request-model/request-model";
import { eFeedbackStatus } from "./../../../helper/constants";
import { Util } from "./../../../helper/util";

import { LocalStorageKeys } from './../../../helper/constants';
/**
 * Generated class for the FeedbackHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-feedback-history",
  templateUrl: "feedback-history.html"
})
export class FeedbackHistoryPage {
  get user_id() {
    return Number(localStorage.getItem(LocalStorageKeys.user_id));
  }

  get selected_feedback_id() {
    console.log("Test data"+this.navParams.data.feedbackID)
    return  this.navParams.data.feedbackID;
    //return Number(localStorage.getItem(LocalStorageKeys.selected_feedback_id));
  }
  public feedbackStatusEnum = eFeedbackStatus;
  public teamUserList: KeyValuePair[];
  public feedbackCategoryList: KeyValuePair[];
  public oldSubject: String;
  public oldMessage: String;
  public oldCategory: String;
  public oldCreatedFor: String;
  public EscalatedUserName: String;
  public created_on: String;
  public ReplyMessage: String;
  public subject: String;
  public message: String;
  public selectedTeamMember: Number;
  public selectedFeedbackCategory: KeyValuePair;
  public feedbackEscalatedMessages: FeedbackEscalationMapping[];
  public show_escalation_history = false;
  public is_escalation_required = false;
  public escalateReq = false;
  public is_reply_button_required = false;
  public show_reply_history = false;
  public chat_history: FeedbackReplyModel[];
  public disableYes = false;
  public disableNo = false;
  public disableEscalate = false;
  disableEscalateSubmit = false;
  public isCreator=false;
  public feedbackStatusId:Number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public feedbackServiceCall: FeedbackServiceProvider
  ) { }

  escalateFeedBack() {
    this.escalateReq = true;
    if (this.disableEscalate) {
      this.disableEscalate = false;
      this.disableYes = false;
      this.disableNo = false;
    } else {
      this.disableEscalate = true;
      this.disableYes = true;
      this.disableNo = true;
    }
  }

  async ionViewDidLoad() {
    
    console.log("ionViewDidLoad FeedbackHistoryPage");
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;

    let fcRespObj = await this.feedbackServiceCall.FeedbackHistory(reqObj);
    if (
      fcRespObj.feedbackEscalationHistory != null &&
      fcRespObj.feedbackEscalationHistory.length > 0
    ) {
      if (this.user_id != fcRespObj.feedbackDetails.createdFor){
        this.EscalatedUserName="Escalated :" + fcRespObj.feedbackDetails.escalatedUserName;
        this.isCreator=true;
      }
      this.show_escalation_history = true;
      this.feedbackEscalatedMessages = fcRespObj.feedbackEscalationHistory;
    }
    if (fcRespObj.isEscalationAllowed) {
      this.is_escalation_required = true;
    }
    if (fcRespObj.isReplyRequired) {
      this.is_reply_button_required = true;
    }
    if (fcRespObj.isChatHistoryAccessible) {
      this.chat_history = fcRespObj.replyList;
      this.show_reply_history = true;
    }
    this.feedbackStatusId=fcRespObj.feedbackDetails.statusId;
    this.oldSubject = fcRespObj.feedbackDetails.subject;
    this.oldMessage = fcRespObj.feedbackDetails.message;
    this.oldCategory = fcRespObj.feedbackDetails.feedbackCategoryName;
    this.created_on = fcRespObj.feedbackDetails.strCreatedOn;
    if (this.user_id != fcRespObj.feedbackDetails.createdFor) {
      this.oldCreatedFor = "To :" + fcRespObj.feedbackDetails.createdForName;
    }
    let respObj = await this.feedbackServiceCall.teamList(reqObj);
    if (respObj.status_code == 200) {
      this.teamUserList = respObj.userList;
    } else {
      console.log("teamList is not fetched");
    }
  }

  async escalateFeedback() {
    if (
      this.selectedTeamMember != undefined &&
      this.message != undefined &&
      this.selectedTeamMember > 0 &&
      this.message.length > 0
    ) {
      this.disableEscalateSubmit = true;
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
      if ((respObj.status_code = 200)) {
        this.navCtrl.push("LandingPage");
      }
    } else {
      let alert = new Util(this.alertCtrl);
      alert.showAlert("Escalation", "Please enter all the mandatory fields");
    }
  }

  escalate() {
    this.showConfirm();
  }

  async UpdatedStatus(status: Number) {
    console.log(status);
    let reqObj = new giveFeedback();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_info = new feedbackInfo();
    reqObj.feedback_id = this.selected_feedback_id;
    reqObj.feedback_info.Id = this.selected_feedback_id;
    reqObj.feedback_info.StatusId = status;
    console.log(this.selected_feedback_id);
    let respObj = await this.feedbackServiceCall.giveFeedback(reqObj);
    if ((respObj.status_code = 200)) {
      this.navCtrl.push("LandingPage");
    }
  }

  async Reply() {
    let reqObj = new replyReq();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.feedback_id = this.selected_feedback_id;
    reqObj.reply = this.ReplyMessage;
    console.log(this.selected_feedback_id);
    let respObj = await this.feedbackServiceCall.Reply(reqObj);
    if ((respObj.status_code = 200)) {
      this.navCtrl.push("LandingPage");
    }
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: "Do you want to Escalate?",
      message: "Are you sure, You want to escalate this feedback?",
      buttons: [
        {
          text: "Disagree",
          handler: () => {
            //confirm.dismiss();
          }
        },
        {
          text: "Agree",
          handler: () => {
            this.escalateFeedback();
          }
        }
      ]
    });
    confirm.present();
  }
}
