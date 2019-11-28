import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from './../../helper/constants';
import { RequestModelComponent,VerifyOTPReq } from './../../components/request-model/request-model';
import {ResponseModelComponent,EscalatedUserListResp,TeamListResponse,FeedbackListResponse} from './../../components/response-model/response-model';

/*
  Generated class for the AuthenticationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable(
)
export class AuthenticationServiceProvider {

  //public http:HttpClient;
  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationServiceProvider Provider');
  }


  async escalationUserListCall (body: RequestModelComponent) :Promise<EscalatedUserListResp>{
    let obj= new EscalatedUserListResp();
    let requestURL = constants.BaseURL + constants.EscalatedUserList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<EscalatedUserListResp>(requestURL, requestBody, options).toPromise();
    return resp;
   
  }

  async escalationUserFeedbackListCall (body: RequestModelComponent) :Promise<FeedbackListResponse>{
    let obj= new EscalatedUserListResp();
    let requestURL = constants.BaseURL + constants.FeedbackList;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<FeedbackListResponse>(requestURL, requestBody, options).toPromise();
    return resp;
   
  }

  async generateOTP (body: RequestModelComponent) :Promise<ResponseModelComponent>{
    let obj= new ResponseModelComponent();
    let requestURL = constants.BaseURL + constants.GenerateOTP;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<ResponseModelComponent>(requestURL, requestBody, options).toPromise();
    return resp;
   
  }


 async verifyOTP (body: VerifyOTPReq) :Promise<ResponseModelComponent>{
    let requestURL = constants.BaseURL + constants.VerifyOTP;
    let requestBody = JSON.stringify(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    const resp= await this.http.post<ResponseModelComponent>(requestURL, requestBody, options).toPromise();
    return resp;
    // const req= this.http.post<ResponseModelComponent>(requestURL, requestBody, options)
    // .subscribe(
    //   res => {
        
    //     console.log(res);
    //     obj.token=res.token;
    //     obj.status_code=res.status_code;
    //     obj.status_message=res.status_message;
    //     console.log(obj.status_code);
    //     return obj;
    //   },
    //   err => {
    //     console.log(err);
        
    //     obj.status_code=501;
    //     obj.status_message="Internal Server Error";
    //     return obj;
    //   }
    // );
    
    // return obj;
  }


}
