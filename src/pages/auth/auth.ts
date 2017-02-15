import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage  } from '../signin/signin';
import { SignupPage  } from '../signup/signup';

/*
  Generated class for the Auth page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }
  loadSignInPage() {
    this.modalCtrl.create(SigninPage).present();
  }
  loadSignUpPage(){
    this.modalCtrl.create(SignupPage).present();
  }

}
