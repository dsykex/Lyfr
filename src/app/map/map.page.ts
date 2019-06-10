import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as firebase from '../fbconfig';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(public router: Router, public geo: Geolocation) { }

  @ViewChild('mapCanvas') mapCanvas: ElementRef;
  map: any;

  ngOnInit() {
    //this.loadMap();
    let options = {
      accuracy: 0,
      timeout: 5000,
      maximumAge: 0
    }
    this.geo.getCurrentPosition(options).then(coords => {
      let _lat = coords.coords.latitude;
      let _lng = coords.coords.longitude;
      this.map = new google.maps.Map(this.mapCanvas.nativeElement, {
        center: {lat: _lat, lng: _lng},
        zoom: 18,
        tilt: 30
      });
    });
  }

  loadMap() 
  {
    let options = {
      accuracy: 0,
      timeout: 5000,
      maximumAge: 0
    }
    this.geo.getCurrentPosition(options).then(coords => {
      let _lat = coords.coords.latitude;
      let _lng = coords.coords.longitude;
      this.map = new google.maps.Map(this.mapCanvas.nativeElement, {
        center: {lat: _lat, lng: _lng},
        zoom: 18,
        tilt: 30
      });
    });
  }

}
