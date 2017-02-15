import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { WritePage } from '../write/write';
import { TimelineService } from '../../services/timeline.services';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Timeline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
  providers: [TimelineService]
})
export class TimelinePage {
  timelines: Timeline[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public timelineService : TimelineService, private storage: Storage) { }

  ionViewDidLoad() {
    this.timelineService.getTimeline(localStorage.getItem('userToken')).subscribe(res => {
        console.log(res);
        this.timelines = res.data;
    })
    console.log('ionViewDidLoad TimelinePage');
  }

  showWritePage() {
    this.modalCtrl.create(WritePage, {parentView: this}).present();
  }

  doRefresh(refresher){
    this.refreshTimeLine();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  refreshTimeLine(){
     this.timelineService.getTimeline(localStorage.getItem('userToken')).subscribe(res => {
        console.log(res);
        this.timelines = res.data;
    })
    console.log('refreshed timeline');
  }

}

interface Timeline{
  title:string,
  content:string,
  created_at:string
}