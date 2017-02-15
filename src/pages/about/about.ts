import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {UserActivityService} from '../../services/user.activity.services'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers : [UserActivityService]
})
export class AboutPage {

  activities:activity[];

  constructor(public navCtrl: NavController, public userActivityService:UserActivityService) {

  }
  ionViewDidLoad() {
    this.userActivityService.getUserActivities(localStorage.getItem('userToken'), localStorage.getItem('userId')).subscribe(res => {
        console.log(res);
        this.activities = res.data;
    })
    console.log('ionViewDidLoad UserActivitypage');
  }

  doRefresh(refresher){
    this.userActivityService.getUserActivities(localStorage.getItem('userToken'), localStorage.getItem('userId')).subscribe(res => {
        console.log(res);
        this.activities = res.data;
    })
    console.log('refresh completed');

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
}

interface activity{
 content:string,
}