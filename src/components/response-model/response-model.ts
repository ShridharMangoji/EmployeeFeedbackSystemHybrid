import { feedbackInfo ,FeedbackEscalationMapping,feedback} from './../../components/request-model/request-model';
export class ResponseModelComponent {
    status_message: String;
    status_code: Number;
    token:string;
  }

  export class VerifyOTPResp extends ResponseModelComponent {
    name: string;
  }

  export class TeamListResponse extends ResponseModelComponent{
    userList:KeyValuePair[];
  }

  export class FeedbackDetailListResp extends ResponseModelComponent{
    isEscalationRequired:boolean;
    feedbackCreatedByMe:feedback[];
    feedbackCreatedForMe:feedback[];
    feedbackEscalatedToMe:feedback[];
  }


  export class EscalatedUserListResp extends ResponseModelComponent{
    userList:KeyValuePair[];
  }

  export class feedbackCategoryResponse extends ResponseModelComponent{
    feedback_categories:KeyValuePair[];
  }

  export class FeedbackHistoryResp extends ResponseModelComponent{
    isReplyRequired:boolean;
    isChatHistoryAccessible:boolean;
    replyList:FeedbackReplyModel[];
    isEscalationAllowed:boolean;
    feedbackDetails:feedback;
    feedbackEscalationHistory: FeedbackEscalationMapping[];
  }
  export class KeyValuePair{
    id:Number;
    name:string;
  }

  export class FeedbackReplyModel{
    reply_message:string;
    replied_user_id:Number;
  }
  
  export class FeedbackListResponse extends ResponseModelComponent{
    feedbackList:feedbackInfo[];
  }

  // export class feedback{
  //   id:Number;
  //   subject:string;
  //   message:string;
  // }
