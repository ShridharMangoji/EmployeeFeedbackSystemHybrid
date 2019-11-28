import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackCreatePage } from './feedback-create';

@NgModule({
  declarations: [
    FeedbackCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackCreatePage),
  ],
})
export class FeedbackCreatePageModule {}
