import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Http} from '@angular/http';
import {LocationService} from '../location-service.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  slideOpts: any = {
    initialSlide: 1,
    speed: 200,
    height: 100,
    effect: 'fade'
  }
  public address: any
  public city: any;
  public area: any;
  public user: any = {};
  public eventThumbs = [
    '../../assets/media/short_north.jpg',
    'http://4.bp.blogspot.com/-JdU_YwnmuMg/Ul79nxmRetI/AAAAAAAAAwQ/5JHXuXnn8cU/s1600/Book-Reading2.jpg'
  ]

  public thumb: any;

  @ViewChild('slides') slides: IonSlides;

  constructor(public locService: LocationService, public authService: AuthService, public router: Router, public http: Http, public nativeGeo: NativeGeocoder, public alertCtrl: AlertController) { 
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCfkhZyM-629ck2kJCjyVp8_2xoaj07hUw

  }

  loadEvents(type: string)
  {
    console.log(type);
  }


  ngOnInit()
  {
    
     this.locService.getLocationInfo().subscribe(info => {
        console.log(info);

       this.address = info.address;
       this.city = info.city;
       this.area = info.area;
     });

     this.thumb = this.eventThumbs[0];
     this.authService.getUserInfo().then(uInfo => {
       this.user = uInfo;
     })
  }
  
  addEvent()
  {
    this.router.navigateByUrl('/add-event');
  }

  async showLocationInfo() {
    const alert = await this.alertCtrl.create({
      header: 'You are here!',
      message: `Address: ${this.address} <br><br> Area: ${this.area} <br><br> City: ${this.city}`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  loadMap()
  {
    this.router.navigateByUrl('/map');
  }

  slideChanged()
  {
    this.slides.getActiveIndex().then(index => {
      console.log(index);
      this.thumb = this.eventThumbs[index];
    })
    
  }
}
