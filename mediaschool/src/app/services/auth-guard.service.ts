import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFirestore} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
private firbase: AngularFirestore;
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private firbase: AngularFirestore;) { }

  canActivate(): Observable<boolean> | Promise<boolean> {
    return new Promise(
      (resolve, _reject)=>{
        firebase.auth().onAuthStateChanged(
          (user)=>{
            if (user) {
              resolve(true);
            }else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
