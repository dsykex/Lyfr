import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
  public results: any;
  @ViewChild('slides') slides: IonSlides;

  constructor(public router: Router, public geo: Geolocation, public nativeGeo: NativeGeocoder) { 
    
  }

  ngOnInit()
  {
     let geoOptions = {
       maximumAge: 0,
       timeout: 5000,
       highAccuracy: true
     }
      this.geo.getCurrentPosition().then(pos => {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
      };
          this.nativeGeo.reverseGeocode(pos.coords.latitude, pos.coords.longitude, options).then(result=>{
            this.results = JSON.stringify(result);
          })
      }).catch(error => {

      })
  }
  
  addEvent()
  {
    this.router.navigateByUrl('/add-event');
  }

  slideChanged()
  {

  }
}
