import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {AuthService} from '../auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})

export class LandingPage implements OnInit {
  uInfo: any = {};
  constructor(public router:Router, public route: ActivatedRoute, public af: AngularFireDatabase, public authService: AuthService)
  { 

  }

  ngOnInit()
  {
    this.authService.getUserInfo().subscribe(userData => {
      this.uInfo = userData;
      if(this.uInfo)
      {
        this.router.navigateByUrl('/home');
      }
      else
      { 
        this.router.navigateByUrl('/login');
      }
    });
    
  }

}
