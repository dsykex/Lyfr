import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth-service.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';

export const fbConfig = {
  apiKey: "AIzaSyDvL64xmS2wkPgZoWciOe2BjiLjzp9f780",
  authDomain: "lyfr-d2f3d.firebaseapp.com",
  databaseURL: "https://lyfr-d2f3d.firebaseio.com",
  projectId: "lyfr-d2f3d",
  storageBucket: "lyfr-d2f3d.appspot.com",
  messagingSenderId: "249663250644",
  appId: "1:249663250644:web:34825efab8f58ace"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFireDatabaseModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
