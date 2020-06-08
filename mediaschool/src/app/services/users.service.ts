import { Injectable, Output, Directive } from '@angular/core';
import * as firebase from 'firebase';
import  DataSnapshot = firebase.database.DataSnapshot;
import { User } from '../model/user-model';
import { Subject } from 'rxjs';

// @Directive()
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor() { }

  emitUser(){
    this.usersSubject.next(this.user);
  }

  saveUsers(){
    firebase.database().ref('/users').set(this.user);
  }

  getUsers(){
    firebase.database().ref('/users')
      .on('value', (data: DataSnapshot)=>{
        this.user = data.val() ? data.val() : [];

        this.emitUser();
      }
    );
  }

  createNewUser(newUser: User){
    this.user.push(newUser);
    this.saveUsers();
    this.emitUser();
  }

  removeUser(user: User){
    const postIndexToRemove = this.user.findIndex(
      (userEl)=>{
        if (userEl === user) {
          return true;
        }
      }
    );
    this.user.splice(postIndexToRemove, 1);
    this.saveUsers();
    this.emitUser();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}
}
