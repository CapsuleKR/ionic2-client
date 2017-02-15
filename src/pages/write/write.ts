import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, NavParams, ModalController, AlertController, ViewController, ToastController} from 'ionic-angular';
import {TimelineService} from '../../services/timeline.services'
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import {TimelinePage} from '../timeline/timeline'

declare var google;

/*
  Generated class for the Write page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-write',
  templateUrl: 'write.html',
  providers: [TimelineService]
})
export class WritePage {

  title: string;
  content: string;
  parentView:TimelinePage

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public viewCtrl: ViewController, public timelineService: TimelineService, public alertCtrl: AlertController) { 
    this.loadMap();

    //get params
    this.parentView = navParams.get('parentView');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritePage');
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  writeTimeLine(){
    var position = this.map.getCenter()
    
    console.log('lat : ', position.lat());
    console.log('lng : ', position.lng());

    //set json object for params object
    var contentjson = {
      'title' : this.title,
      'content' : this.content,
      'latitude' : position.lat(),
      'longitude' : position.lng()
    }
    console.log('userToken :'+ localStorage.getItem('userToken').toString())
    this.timelineService.postTimeline(localStorage.getItem('userToken').toString() ,contentjson).subscribe(
      data => {
        console.log('timeline body:', data)
        switch (data.code) {
          case 201:
          
            this.toastCtrl.create({
              message: '성공적으로 글이 저장 되었습니다.',
              duration: 3000
            }).present();
            
            this.parentView.ionViewDidLoad();

            break;
          default:
            this.alertCtrl.create({
              title: '글 업로드에 실패했습니다.',
              subTitle: '입력하신 정보를 다시한번 확인해주세요.',
              buttons: ['확인']
            }).present();
            break;
        }
      }
    )
  }
  
}



// WEBPACK FOOTER //
// ./src/pages/write/write.ts