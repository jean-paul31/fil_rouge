import { Injectable, Output } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../model/user-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() users: User[] = [];
  postsSubject = new Subject<User[]>();

  constructor() { }

  emitUser(){
    this.postsSubject.next(this.users);
  }

  saveUsers(){
    firebase.database().ref('/users').set(this.users);
  }

  createNewUser(newUser: User){
    this.users.push(newUser);
    this.saveUsers();
    this.emitUser();
  }

  removeUser(user: User){
    const postIndexToRemove = this.users.findIndex(
      (userEl)=>{
        if (userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(postIndexToRemove, 1);
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
