import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TimelinePage } from '../pages/timeline/timeline'
import { NewCapsulePage } from '../pages/new-capsule/new-capsule'
import { AuthPage } from '../pages/auth/auth';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { WritePage } from '../pages/write/write';
import { AuthService } from '../services/auth.services';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ChooseFriendsPage } from '../pages/choose-friends/choose-friends';
import { ChooseSchoolPage } from '../pages/choose-school/choose-school';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, TimelinePage,
    NewCapsulePage,
    AuthPage,
    SigninPage,
    SignupPage,
    WritePage,
    ChooseFriendsPage,
    ChooseSchoolPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TimelinePage,
    NewCapsulePage,
    AuthPage,
    SigninPage,
    SignupPage,
    WritePage,
    ChooseFriendsPage,
    ChooseSchoolPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage]
})
export class AppModule { }
