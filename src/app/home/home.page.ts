import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Http} from '@angular/http';

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

  constructor(public router: Router, public http: Http, public geo: Geolocation, public nativeGeo: NativeGeocoder) { 
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCfkhZyM-629ck2kJCjyVp8_2xoaj07hUw

  }

  ngOnInit()
  {
     
      this.geo.getCurrentPosition().then(pos => {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
          };
          
          this.http.post('https://maps.googleapis.com/maps/api/geocode/json?latlng=41.0466047,-81.5625997&key=AIzaSyCfkhZyM-629ck2kJCjyVp8_2xoaj07hUw', null)
            .subscribe(data => {
            let locData = data.json();
            console.log(locData);

            this.address = locData.results[0].formatted_address;
            let a = locData.results.filter(area => {return (area.types[0] == "neighborhood") && (area.types[1] == "political")})[0];
            console.log(a);

            let c = locData.results.filter(area => {return (area.types[0] == "postal_code") })[0];
            let cFormatted= c.address_components[1].long_name + ', ' + c.address_components[3].short_name;
            this.city = cFormatted;
            if(a!=null)
              this.area = a.address_components[0].long_name;
            else
            {
              a = locData.results.filter(area => {return (area.types[0] == "administrative_area_level_3") })[0].address_components[0].long_name;
              if(a!=null)
                this.area = a;
              else
                this.area = this.city;
            }
            
          })
      }).catch(error => {

      })
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
