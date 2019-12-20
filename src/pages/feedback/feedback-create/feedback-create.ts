import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { KeyValuePair } from './../../../components/response-model/response-model';
import { FeedbackServiceProvider } from './../../../providers/feedback-service/feedback-service';
import { RequestModelComponent, giveFeedback, feedbackInfo } from './../../../components/request-model/request-model';
import { Util } from './../../../helper/util';

import { LocalStorageKeys} from './../../../helper/constants';
/**
 * Generated class for the FeedbackCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-create',
  templateUrl: 'feedback-create.html',
})
export class FeedbackCreatePage {
  get user_id() {
    return Number(localStorage.getItem(LocalStorageKeys.user_id));
  }

  public teamUserList: KeyValuePair[];
  public feedbackCategoryList: KeyValuePair[];
  public subject: string;
  public message: string;
  public selectedTeamMember: KeyValuePair;
  public selectedFeedbackCategory: KeyValuePair;
  public disableSubmit=false;

  constructor(public menuCtrl: MenuController,
    public feedbackServiceCall: FeedbackServiceProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.menuCtrl.enable(true)
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackCreatePage12121');

    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;

    let respObj = await this.feedbackServiceCall.teamList(reqObj);
    let fcRespObj = await this.feedbackServiceCall.feedbackCategoryList(reqObj);
    if (respObj.status_code == 200) {
      this.teamUserList = respObj.userList;
      this.feedbackCategoryList = fcRespObj.feedback_categories;
      console.log("teamList is fetch " + this.teamUserList[0].name);
    }
    else {
      console.log("teamList is not fetched");
    }
  }

  async submitGivenFeedback() {

    if (this.message!=undefined && this.selectedTeamMember.id !=undefined && this.selectedFeedbackCategory.id !=undefined) {

      if (this.message.length > 0 && this.selectedTeamMember.id > 0 && this.selectedFeedbackCategory.id > 0) {
       // this.disableSubmit=true;
        let reqObj = new giveFeedback();
        reqObj.device_id = "abc";
        reqObj.os_type = "Android";
        reqObj.user_id = this.user_id;
        reqObj.feedback_info = new feedbackInfo();
        reqObj.feedback_info.Message = this.message;
        reqObj.feedback_info.Subject = "Test Subject";
        reqObj.feedback_info.CreatedFor = this.selectedTeamMember.id;
        reqObj.feedback_info.FeedbackCategoryId = this.selectedFeedbackCategory.id;
        reqObj.feedback_info.CreatedBy = this.user_id;
        reqObj.feedback_id = 0;
        reqObj.feedback_info.Id = 0;
        reqObj.feedback_info.StatusId = 1;
        let respObj = await this.feedbackServiceCall.giveFeedback(reqObj);
        if (respObj.status_code == 200) {
          this.navCtrl.push('LandingPage');
        }
        else {
          console.log("teamList is not fetched");
        }
      }
      else {
        let alert = new Util(this.alertCtrl);
        alert.showAlert("Feedback Create", "Please enter all the mandatory fields");
      }
    }else{
      let alert = new Util(this.alertCtrl);
      alert.showAlert("Feedback Create", "Please enter all the mandatory fields");
    }
  }

  async submitFeedback() {

    const confirm = this.alertCtrl.create({
      title: 'Please confirm?',
      message: 'Are you sure you want to submit the feedback?',
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

            this.submitGivenFeedback();

          }
        }
      ]
    });
    confirm.present();
  }


}
