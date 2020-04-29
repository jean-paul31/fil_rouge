import { Injectable } from '@angular/core';
import { Child } from '../model/child-model';

import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;



@Injectable({
  providedIn: 'root'
})
export class ChildServiceService {

  children: Child[] = [];

  childSubject = new Subject<Child[]>();

 

  constructor() {
    this.getChildren();
   }

  emitChild(){
    this.childSubject.next(this.children);
  }

  registerChild(){
    firebase.database().ref('/child').set(this.children)
  }

  getChildren() {
    firebase.database().ref('/child')
      .on('value', (data: DataSnapshot) => {
          this.children = data.val() ? data.val() : [];
          this.emitChild();
        }
      );
  }

  getSingleChild(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/child' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewChild(newChild: Child) {
    this.children.push(newChild);
    this.registerChild();
    this.emitChild();
  }

  removeChild(child: Child) {
    const childIndexToRemove = this.children.findIndex(
      (childEl) => {
        if(childEl === child) {
          return true;
        }
      }
    );
    this.children.splice(childIndexToRemove, 1);
    this.registerChild();
    this.emitChild();
  }
}
