import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, ModalController } from 'ionic-angular';
import { NewCapsulePage } from '../new-capsule/new-capsule';
import { CapsuleServices } from '../../services/capsule.services';

import { Storage } from '@ionic/storage';

declare var google;




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CapsuleServices]
})
export class HomePage {
  schoolList: School[]

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public capsuleService: CapsuleServices, public storage: Storage) {
    let markers = {
      'capsule': '../assets/images/marker_capsule.png',
      'school': '../assets/images/marker_school.png'
    }

    this.loadMap(() => {
      this.capsuleService.getSchools().subscribe(res => {
        res.data.forEach(elm => {

          console.log(elm);

          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: { lat: elm.latitude, lng: elm.longitude },
            icon: markers.school
          });

          let content = "<h4 class='name'>"+elm.name+"</h4><p class='address'>"+elm.address+"</p>";

          this.addInfoWindow(marker, content);
        })
      });

      this.capsuleService.getCapsules(localStorage.getItem('userToken').toString()).subscribe(res => {
        res.data.forEach(elm => {
          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: { lat: elm.latitude, lng: elm.longitude },
            icon: markers.capsule
          });

          console.log('eml : ', elm)

          let content = "<h4>캡슐이름 : "+elm.title+"</h4><br /><h3>캡슐 생성일 : " + + "</h3>  <br /><button></button>";

          this.addInfoWindow(marker, content);
        })
      });
    });
  }

  loadNewCapsulePage() {
    this.modalCtrl.create(NewCapsulePage).present();
  }

  ionViewLoaded() {

  }

  loadMap(afterLoadedMap) {

    Geolocation.getCurrentPosition().then((position) => {

     let latLng = new google.maps.LatLng(37.504116, 127.044886);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] }]
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      afterLoadedMap();
    }, (err) => {
      console.log(err);
    });

  }



  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);
  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}
interface School {
  address: string;
  created_at: string;
  id: number;
  latitude: string;
  longitude: string;
  link: string;
  name: string;
}