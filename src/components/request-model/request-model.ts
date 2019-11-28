
/**
 * Generated class for the RequestModelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export class RequestModelComponent {
  device_id: String;
  os_type: String;
  user_id: Number;
  token: String;
  feedback_id:Number;
}

export class VerifyOTPReq extends RequestModelComponent {
  otp: String;
}

export class giveFeedback extends RequestModelComponent {
  feedback_info:feedbackInfo;
}

export class FeedbackListReq extends RequestModelComponent {
  escalated_user_id:Number;
}

export class feedbackInfo{
  Id: Number;
  Subject: String;
  Message: String;
  StatusId: Number;
  CreatedFor: Number;
  CreatedBy: Number;
  FeedbackCategoryId:Number;
}

export class feedback{
  id: Number;
  subject: String;
  message: String;
  statusId: Number;
  createdFor: Number;
  createdBy: Number;
  feedbackCategoryId:Number;
}
export class FeedbackEscalationMapping{
  Id: Number;
  Subject: String;
  Message: String;
  FeedbackId: Number;
  EscalatedUserId: Number;
 
}