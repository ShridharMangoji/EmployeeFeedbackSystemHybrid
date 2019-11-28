import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscalatedUserPage } from './escalated-user';

@NgModule({
  declarations: [
    EscalatedUserPage,
  ],
  imports: [
    IonicPageModule.forChild(EscalatedUserPage),
  ],
})
export class EscalatedUserPageModule {}
