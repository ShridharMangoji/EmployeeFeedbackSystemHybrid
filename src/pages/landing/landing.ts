import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { RequestModelComponent } from './../../components/request-model/request-model';
import { AuthenticationServiceProvider } from './../../providers/authentication-service/authentication-service';
import { FeedbackServiceProvider } from './../../providers/feedback-service/feedback-service';


//import { EscalatedUserListResp,ResponseModelComponent } from './../../components/response-model/response-model';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  get user_id() {
    return Number(localStorage.getItem("user_id"));
  }
  public escalated = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public authCall: AuthenticationServiceProvider,public feedbackServiceCall : FeedbackServiceProvider) {


  }

  async escalatedUserList() {
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    let respObj = await this.feedbackServiceCall.FeedbackDetailList(reqObj);
    if (respObj.status_code == 200) {
      console.log(respObj.feedbackEscalatedToMe.length )
      if (respObj.feedbackEscalatedToMe.length > 0) {
        this.events.publish('isEscalationRequired', true, Date.now());
        this.escalated = true;
      } else {
        this.events.publish('isEscalationRequired', false, Date.now());
        this.escalated = false;
      }
    }

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
    this.escalatedUserList();
  }
  giveFeedback() {
    this.navCtrl.push('FeedbackCreatePage');
  }

  escalatedFeedbackList(){
   let params={tabIndex:"escalatedFeedback"};
   // localStorage.setItem("SectionToBeSelected", "escalatedFeedback");
    this.navCtrl.push('FeedbackListPage',params);
  }
}
