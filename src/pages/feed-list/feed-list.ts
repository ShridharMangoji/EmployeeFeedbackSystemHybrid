import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestModelComponent, FeedbackListReq, feedbackInfo } from './../../components/request-model/request-model';
import { AuthenticationServiceProvider } from './../../providers/authentication-service/authentication-service';

/**
 * Generated class for the FeedListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html',
})
export class FeedListPage {
  get user_id() {
    return Number(localStorage.getItem("user_id"));
  }
  get team_user_id() {
    return Number(localStorage.getItem("team_user_id"));
  }
  public feedbackList: feedbackInfo[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authCall: AuthenticationServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedListPage');
    this.escalatedFeedbackList();
  }
  async escalatedFeedbackList() {
    let reqObj = new FeedbackListReq();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    reqObj.escalated_user_id = this.team_user_id;

    let respObj = await this.authCall.escalationUserFeedbackListCall(reqObj);
    console.log(respObj.feedbackList.length);
    if (respObj.status_code == 200) {
      this.feedbackList = respObj.feedbackList;
    }
  }
  itemSelected(data) {
    console.log(data);
    localStorage.setItem("selected_feedback_id", String(data));
    
    this.navCtrl.push('FeedbackHistoryPage');
    
  }
}
