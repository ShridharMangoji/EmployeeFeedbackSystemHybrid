import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackHistoryPage } from './feedback-history';

@NgModule({
  declarations: [
    FeedbackHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackHistoryPage),
  ],
})
export class FeedbackHistoryPageModule {}
