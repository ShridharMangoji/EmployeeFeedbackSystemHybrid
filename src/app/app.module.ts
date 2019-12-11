import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { AuthenticationServiceProvider } from '../providers/authentication-service/authentication-service';
import { FeedbackServiceProvider } from '../providers/feedback-service/feedback-service';
import { ErrorsHandlerProvider } from '../providers/errors-handler/errors-handler';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationServiceProvider,
    FeedbackServiceProvider,
    ErrorsHandlerProvider
  ]
})
export class AppModule {}
