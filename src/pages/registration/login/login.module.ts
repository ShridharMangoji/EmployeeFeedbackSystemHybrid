import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthenticationServiceProvider } from './../../../providers/authentication-service/authentication-service';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  providers: [
    AuthenticationServiceProvider
  ]
})
export class LoginPageModule {}
