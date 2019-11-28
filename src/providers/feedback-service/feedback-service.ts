import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from './../../helper/constants';
import { RequestModelComponent ,giveFeedback} from './../../components/request-model/request-model';
import {ResponseModelComponent,TeamListResponse,feedbackCategoryResponse,FeedbackHistoryResp} from './../../components/response-model/response-model';


/*
  Generated class for the FeedbackServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedbackServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FeedbackServiceProvider Provider');
  }

  async teamList (body: RequestModelComponent) :Promise<TeamListResponse>{
    let requestURL = constants.BaseURL + constants.TeamList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<TeamListResponse>(requestURL, requestBody, options).toPromise();
    return resp;
  }

  async FeedbackEscalationTeam (body: RequestModelComponent) :Promise<TeamListResponse>{
    let requestURL = constants.BaseURL + constants.TeamList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<TeamListResponse>(requestURL, requestBody, options).toPromise();
    return resp;
  }

 

  async feedbackCategoryList (body: RequestModelComponent) :Promise<feedbackCategoryResponse>{
    let requestURL = constants.BaseURL + constants.FeedbackCategory;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<feedbackCategoryResponse>(requestURL, requestBody, options).toPromise();
    return resp;
  }

  async FeedbackHistory (body: RequestModelComponent) :Promise<FeedbackHistoryResp>{
    let requestURL = constants.BaseURL + constants.FeedbackHistory;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<FeedbackHistoryResp>(requestURL, requestBody, options).toPromise();
    return resp;
  }

  async giveFeedback (body: giveFeedback) :Promise<ResponseModelComponent>{
    body.feedback_id=0;
    body.feedback_info.Id=0;
    body.feedback_info.StatusId=1;
    let requestURL = constants.BaseURL + constants.UpdateFeedback;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<ResponseModelComponent>(requestURL, requestBody, options).toPromise();
    return resp;
  }

}
