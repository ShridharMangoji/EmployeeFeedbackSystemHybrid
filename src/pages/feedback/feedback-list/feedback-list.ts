import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  RequestModelComponent,
  feedback} from "./../../../components/request-model/request-model";
import { FeedbackServiceProvider } from "./../../../providers/feedback-service/feedback-service";
import {
  KeyValuePair
} from "./../../../components/response-model/response-model";
import { Events } from "ionic-angular";
import { AuthenticationServiceProvider } from "./../../../providers/authentication-service/authentication-service";

/**
 * Generated class for the FeedbackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-feedback-list",
  templateUrl: "feedback-list.html"
})
export class FeedbackListPage {
  pet: string = "myFeedbacks";
  get user_id() {
    return Number(localStorage.getItem("user_id"));
  }

  get SelectedSection() {
    return String(localStorage.getItem("SectionToBeSelected"));
  }
  public navParams1: NavParams;
  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public feedbackServiceCall: FeedbackServiceProvider,
    public authCall: AuthenticationServiceProvider
  ) {
    console.log("Test"+navParams.data.tabIndex)
    this.pet = navParams.data.tabIndex;
  }

  feedbackByMe: feedback[];
  feedbackForMe: feedback[];
  feedbackEscalated: feedback[];

  public escalatedUsers: KeyValuePair[];
  isEscalationRequired = false;

  async ionViewDidLoad() {
    console.log("ionViewDidLoad FeedbackListPage");
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    var respObj = await this.feedbackServiceCall.FeedbackDetailListv2(reqObj);
    console.log(respObj);

    if (respObj.status_code == 200) {
      this.isEscalationRequired = respObj.isEscalationRequired;
      this.feedbackByMe = respObj.feedbackCreatedByMe;
      this.feedbackForMe = respObj.feedbackCreatedForMe;
      //this.feedbackEscalated = respObj.feedbackEscalatedToMe;
      this.escalatedUserList();
    }
  }

  async escalatedUserList() {
    let reqObj = new RequestModelComponent();
    reqObj.device_id = "abc";
    reqObj.os_type = "Android";
    reqObj.user_id = this.user_id;
    let respObj = await this.authCall.escalationUserListCall(reqObj);
    if (respObj.status_code == 200) {
      this.escalatedUsers = respObj.userList;
    }
  }

  feedbackSelected(item: string) {
    console.log(item);
    localStorage.setItem("selected_feedback_id", String(item));

    this.navCtrl.push("FeedbackHistoryPage");
  }
  itemSelected(team_user_id) {
    //localStorage.setItem("team_user_id", String(team_user_id));
    //console.log(team_user_id);
    let params = { tabIndex: team_user_id };
    this.navCtrl.push("FeedListPage", params);
  }
}
