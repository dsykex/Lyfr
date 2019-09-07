import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  city: any;
  area: any;
  address: any;
  lat: any;
  lng: any;

  constructor(public http: Http) { }

  getLocationInfo() : Observable<any>
  {
    let locObserver = new Observable(watcher => {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 3000
      }
      Geolocation.getCurrentPosition(options).then(pos => {   
        this.http.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=AIzaSyCfkhZyM-629ck2kJCjyVp8_2xoaj07hUw`, null)
          .subscribe(data => {
          let locData = data.json();
          this.address = locData.results[0].formatted_address;

          let a = locData.results[0].address_components.filter(area => {return (area.types[0] == "neighborhood") && (area.types[1] == "political")})[0];

          let c = locData.results.filter(area => {return (area.types[0] == "postal_code") })[0];
          let state = c.address_components.filter(ac => { return (ac.types[0] == "administrative_area_level_1"); })[0].short_name;
          let cFormatted= c.address_components[1].long_name + ', ' + state;
          
          this.city = cFormatted;

          if(a!=null)
            this.area = a.long_name;
          else
          {
            a = locData.results.filter(area => {return (area.types[0] == "administrative_area_level_3") })[0].address_components[0].long_name;
            if(a!=null)
              this.area = a;
            else
              this.area = this.city;
          }

          let locInfo = {latitude: pos.coords.latitude, longitude: pos.coords.longitude, address: this.address, area: this.area, city: this.city};
          watcher.next(locInfo);
          watcher.complete();
        })
      }).catch(error => {  })

    });
    return locObserver;
    
  }
}
