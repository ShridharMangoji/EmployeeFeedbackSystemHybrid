import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RequestModelComponent } from "./../../components/request-model/request-model";
import { KeyValuePair } from "./../../components/response-model/response-model";
import { AuthenticationServiceProvider } from "./../../providers/authentication-service/authentication-service";

/**
 * Generated class for the EscalatedUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-escalated-user",
  templateUrl: "escalated-user.html"
})
export class EscalatedUserPage {
  get user_id() {
    return Number(localStorage.getItem("user_id"));
  }
  public escalatedUsers: KeyValuePair[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authCall: AuthenticationServiceProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EscalatedUserPage");
    this.escalatedUserList();
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

  itemSelected(team_user_id) {
   // localStorage.setItem("team_user_id", String(team_user_id));
    this.navCtrl.push("FeedListPage");
  }
}
