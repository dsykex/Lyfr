import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userObs: any = {};
  constructor()
  { 
    
  }


  getUserInfo() : Observable<any>
  {
    this.userObs = new Observable( watcher => {
      firebase.auth().onAuthStateChanged(authData => {
          if(authData)
          {
              console.log(authData);
              let db = firebase.firestore();
              let userCol = db.collection('users');
              userCol.get().then(users => {
                if(users.size > 0)
                {
                  let user = userCol.doc(authData.email);
                  if(user)
                  {
                    user.get().then(u=>{ watcher.next(u.data()); watcher.complete(); })
                  }
                  
                }
              });
          }else{
              watcher.next(null);
          }
      });
    });

    return this.userObs;
  }
  

}
