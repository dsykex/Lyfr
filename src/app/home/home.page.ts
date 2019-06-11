import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Http} from '@angular/http';
import {LocationService} from '../location-service.service';

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

  @ViewChild('slides') slides: IonSlides;

  constructor(public locService: LocationService, public router: Router, public http: Http, public geo: Geolocation, public nativeGeo: NativeGeocoder) { 
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
  }
  
  addEvent()
  {
    this.router.navigateByUrl('/add-event');
  }

  loadMap()
  {
    this.router.navigateByUrl('/map');
  }

  slideChanged()
  {

  }
}
