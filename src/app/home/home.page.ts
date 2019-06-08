import { Component, ViewChild, ElementRef } from '@angular/core';
import * as firebase from '../fbconfig';
import {Router} from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  slideOpts: any = {
    initialSlide: 1,
    speed: 200,
    height: 100,
    effect: 'fade'
  }
  
  @ViewChild('slides') slides: IonSlides;

  constructor(public router: Router) {  }
  
  addEvent()
  {
    this.router.navigateByUrl('/add-event');
  }

  slideChanged()
  {

  }
}
