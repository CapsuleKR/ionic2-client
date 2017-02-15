import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CapsuleServices } from '../../services/capsule.services'
import { ChooseFriendsPage } from '../choose-friends/choose-friends'
import { ChooseSchoolPage } from '../choose-school/choose-school'

declare var google;
/*
  Generated class for the NewCapsule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-capsule',
  templateUrl: 'new-capsule.html',
  providers : [CapsuleServices]
})
export class NewCapsulePage {
  users: User[];
  schoolList: School[];

  user_id: string;
  school_id: number;
  title: string;
  content:string;
  latitude: string;
  longitude: string;
  friends: string[];

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public capsuleServices: CapsuleServices) {
    this.loadMap();
    this.user_id = localStorage.getItem('userId');
  }

  loadChooseFriendsPage() {
    let chooseFriendsModal = this.modalCtrl.create(ChooseFriendsPage);
    chooseFriendsModal.present();
    chooseFriendsModal.onDidDismiss(data => {
      this.users = data;
      this.friends = data.map((elm) => {
        return elm.email;
      });
    });
  }

  loadChooseSchoolPage() {
    let chooseSchoolPage = this.modalCtrl.create(ChooseSchoolPage);
    chooseSchoolPage.present();
    chooseSchoolPage.onDidDismiss(data => {
      this.schoolList = data;
      this.school_id = this.schoolList[0].id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCapsulePage');
  }

  closePage() {
    this.viewCtrl.dismiss();
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
  addNewCapsule() {

    this.latitude = this.map.getCenter().lat;
    this.longitude = this.map.getCenter().lng;

    let position = this.map.getCenter();

    let params = {
      'user_id': this.user_id,
      'school_id': this.school_id,
      'title': this.title,
      'content': this.content,
      'latitude': position.lat(),
      'longitude': position.lng(),
      'friends': this.friends
    };

    this.capsuleServices.addCapsules(localStorage.getItem('userToken').toString(), params).subscribe(
      data => {
        switch (data.code) {
          case 201:

          default:
        }
      }
    )
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

interface School {
  address: string;
  created_at: string;
  id: number;
  latitude: string;
  link: string;
  longitude: string;
  name: string;
  checked: boolean;
}

