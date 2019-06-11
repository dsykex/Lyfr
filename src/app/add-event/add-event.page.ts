import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Http} from '@angular/http';
import {LocationService} from '../location-service.service';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  public event: any = {};
  
  constructor(public router: Router, public locService: LocationService) { }
  public area: string;
  public city: any;
  public address: any;
  public lat: any;
  public lng: any;

  public thumbnail: any;

  ngOnInit() {
    this.locService.getLocationInfo().subscribe(info => {
      this.area = info.area;
    })
  }

  uploadThumbnail()
  {

  }

  createEvent()
  {
    
  }

}
