import { Component, OnInit, NgZone } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

import {AuthService} from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  uInfo: any = {};
  constructor(public router:Router, public route: ActivatedRoute, public zone: NgZone, public authService: AuthService)
  { 

  }

  ngOnInit()
  {
    this.authService.getUserInfo().then(userData => {
      this.uInfo = userData;
      console.log(this.uInfo);
      if(this.uInfo)
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

}
