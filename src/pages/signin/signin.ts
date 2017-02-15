import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
// import { Storage, SqlStorage } from 'ionic-framework';
import { AuthService } from '../../services/auth.services'
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [AuthService]
})
export class SigninPage {

  userEmail: string;
  userSecret: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public authService: AuthService, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  requestSignIn() {
    this.authService.signIn(this.userEmail, this.userSecret).subscribe(
      data => {
        console.log('auth body:', data)
        switch (data.code) {
          case 200:
            console.log('data.token :' , data.data.token)
            localStorage.setItem("userToken", data.data.token);
            localStorage.setItem('userId', data.data.user_id);
            this.navCtrl.push(TabsPage);

            this.toastCtrl.create({
              message: '성공적으로 로그인 되었습니다.',
              duration: 3000
            }).present();
            break;
          default:
            this.alertCtrl.create({
              title: '로그인에 실패했습니다.',
              subTitle: '입력하신 정보를 다시한번 확인해주세요.',
              buttons: ['확인']
            }).present();
            break;
        }
      }
    )

  }

}
