import {Component, OnInit, AfterContentInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit
{
  public user: any = {};
  public errorMsg: any = '';
  
  constructor(public router: Router, public alertController: AlertController) 
  { 
    
  }

  /*loadMap() 
  {
    let options = {
      accuracy: 0,
      timeout: 5000,
      maximumAge: 0
    }
    this.geo.getCurrentPosition(options).then(coords => {
      this.lat = coords.coords.latitude;
      this.lng = coords.coords.longitude;
      this.map = new google.maps.Map(this.mapCanvas.nativeElement, {
        center: {lat: this.lat, lng: this.lng},
        zoom: 18,
        tilt: 30
      });
    });
  }*/

  ngOnInit()
  {
    
  }

  login()
  {
    if(this.user.email && this.user.password)
    {
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(()=>{
        this.router.navigateByUrl('/home');
      }).catch(() => {
        this.errorMsg = 'An error occured. Make sure your login credentials are correct and your network is established.';
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      });
    }
    else
    {
      this.errorMsg = 'Credential fields cannot be empty.';
        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
    }
  }

  signup()
  {

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }
}
