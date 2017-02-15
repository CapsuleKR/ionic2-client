import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.services';

/*
  Generated class for the ChooseFriends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choose-friends',
  templateUrl: 'choose-friends.html',
  providers: [AuthService]
})
export class ChooseFriendsPage {
  users: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authService: AuthService, public viewCtrl: ViewController) {
    authService.getAllUser(this.storage.get('userToken').toString()).subscribe(res => {
      this.users = res.data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseFriendsPage');
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  doneSelectPage() {
    this.viewCtrl.dismiss(this.users.map((elm) => {
      if (elm.checked) return elm;
    }).filter((elmm) => {
      return elmm != undefined;
    }));
  }

}
interface User {
  name: string;
  email: string;
  created_at: string;
  id: number;
  permission: string;
  update_at: string;
  checked: boolean;
}