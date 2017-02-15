import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CapsuleServices } from '../../services/capsule.services'

/*
  Generated class for the ChooseSchool page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-choose-school',
  templateUrl: 'choose-school.html',
  providers: [CapsuleServices]

})
export class ChooseSchoolPage {

  schoolList : School[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public capsuleService: CapsuleServices, public viewCtrl: ViewController) {
    capsuleService.getSchools().subscribe(res => {
      this.schoolList = res.data.slice(1,100);
      console.log(this.schoolList);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseSchoolPage');
  }

  doneSelectPage(school) {
    this.viewCtrl.dismiss([school]);
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

}

interface School {
  address : string;
  created_at : string;
  id : number;
  latitude : string;
  link : string;
  longitude:string;
  name : string;
  checked : boolean;
}

