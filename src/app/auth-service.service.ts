import { Injectable } from '@angular/core';
import * as firebase from './fbconfig';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userObs: any = {};
  constructor()
  { 
    
  }


  getUserInfo() : Promise<any>
  {
    this.userObs = new Promise<any>( resolve => {
      firebase.default.auth().onAuthStateChanged(authData => {
          if(authData)
          {
              console.log(authData);
              let db = firebase.default.firestore();
              let userCol = db.collection('users');
              userCol.get().then(users => {
                if(users.size > 0)
                {
                  let user = userCol.doc(authData.email);
                  if(user)
                  {
                    user.get().then(u=>{ resolve(user); })
                  }
                  
                }
              });
          }else{
              resolve({});
          }
      });
    });

    return this.userObs;
  }
  

}
