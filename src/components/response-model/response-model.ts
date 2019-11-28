import { feedbackInfo ,FeedbackEscalationMapping,feedback} from './../../components/request-model/request-model';
export class ResponseModelComponent {
    status_message: String;
    status_code: Number;
    token:string;
  }

  export class TeamListResponse extends ResponseModelComponent{
    userList:KeyValuePair[];
  }

  export class EscalatedUserListResp extends ResponseModelComponent{
    userList:KeyValuePair[];
  }

  export class feedbackCategoryResponse extends ResponseModelComponent{
    feedback_categories:KeyValuePair[];
  }

  export class FeedbackHistoryResp extends ResponseModelComponent{
    feedbackDetails:feedback;
    feedbackEscalationHistory: FeedbackEscalationMapping[];
  }
  export class KeyValuePair{
    id:Number;
    name:string;
  }
  
  export class FeedbackListResponse extends ResponseModelComponent{
    feedbackList:feedbackInfo[];
  }

  // export class feedback{
  //   id:Number;
  //   subject:string;
  //   message:string;
  // }
