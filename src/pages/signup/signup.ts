import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.services'

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthService]
})
export class SignupPage {

  userEmail: string;
  userName: string;
  userSecret: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  requestSignUp() {
    this.authService.signUp(this.userEmail, this.userName, this.userSecret).subscribe(res => {
      console.log(res);
    })
  }

}
