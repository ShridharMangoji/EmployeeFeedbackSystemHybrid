
export const constants = {
    production: true,
    //BaseURL: "http://13.232.165.121/api/api/",//"http://localhost:51731/api/",//"http://localhost/Cool/api/",
    BaseURL: "http://localhost:51731/api/",//"http://localhost/Cool/api/",
    
    GenerateOTP:"Authentication/GenerateOTP",
    VerifyOTP:"Authentication/VerifyOTP",
    TeamList:"User/TeamList",
    UpdateFeedback:"Feedback/UpdateFeedback",
    FeedbackCategory:"Feedback/GetFeedbackCategories",
    EscalatedUserList:"User/EscalatedUserList",
    FeedbackList:"Feedback/FeedbackList",
    FeedbackHistory:"Feedback/FeedbackHistory",
    FeedbackDetailList:"Feedback/FeedbackDetailList",
    ReplyToFeedback:"Feedback/ReplyToFeedback"
  };

  export const LocalStorageKeys={
    user_id:"user_id",
    token:"token",
    user_name:"user_name",
    selected_feedback_id:"selected_feedback_id"
  }

  export enum eFeedbackStatus{
    Created=1,
    Escalated=2,
    Closed_yes=3,
    Closed_no
  }