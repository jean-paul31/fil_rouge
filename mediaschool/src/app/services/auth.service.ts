import { Injectable, Output } from '@angular/core';
import { User } from "../model/user-model";
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  createNewUser(email:string, password:string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          ()=>{
            resolve();
          },
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  signinUser(email:string, password:string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          ()=>{
            resolve();
          },
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  signOutUser(){
    firebase.auth().signOut();
  }

}
