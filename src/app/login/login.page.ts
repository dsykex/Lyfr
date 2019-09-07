import {Component, OnInit, AfterContentInit, ViewChild, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as firebase from '../fbconfig';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit
{
  public user: any = {};
  public 
  public errorMsg: any = '';
  
  constructor(public router: Router, public zone: NgZone, public authService: AuthService, public alertController: AlertController) 
  { 
    
  }

  ngOnInit()
  {
    this.authService.getUserInfo().then(userData => {
      this.user = userData;
      console.log(this.user);
      if(this.user)
      {
        this.zone.run(()=>{
          this.router.navigateByUrl('/home');
        })
      }
      else
      { 
        this.zone.run(()=>{
          this.router.navigateByUrl('/login');
        })
      }
    });
  }

  login()
  {
    if(this.user.email && this.user.password)
    {
      firebase.default.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(()=>{
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
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Welcome to Lyfr!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Display Name'
        },
        {
          name: 'email',
          type: 'email',
          id: 'email-id',
          placeholder: 'Email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        // input date with min & max
        {
          name: 'confirm_password',
          type: 'password',
          placeholder: 'Confirm Password'
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
          text: 'Signup',
          handler: (data) => {
            if(data.name && data.email && data.password && data.confirm_password)
            {
              let db = firebase.default.firestore();
              let users = db.collection('users');
            
              if(data.password == data.confirm_password)
              {
                let newUser = {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  createdAt: Date.now(),
                  rank: 'm'
                }
                firebase.default.auth().createUserWithEmailAndPassword(data.email, data.password).then(()=>{
                  users.doc(data.email).set(newUser).then(()=> {
                    firebase.default.auth().signInWithEmailAndPassword(data.email,data.password).then(()=>{
                      this.router.navigateByUrl('/home');
                    })
                  })
                }).catch(error => {
                  this.errorMsg = 'The email address is already used by another account.';
                  setTimeout(() => {
                    this.errorMsg = '';
                  }, 3000);
                })
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
