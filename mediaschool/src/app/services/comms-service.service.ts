import { Injectable, Output } from '@angular/core';
import { Comm } from '../model/com-model';

import { Subject } from 'rxjs';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
// import { PostsService } from './posts.service';
import { Post } from '../model/posts.model';
import { ActivatedRoute } from '@angular/router';
import { PostsListComponent } from '../blog/posts-list/posts-list.component';



// @Directive()
@Injectable({
  providedIn: 'root'
})

export class CommsService {

  @Output() coms: Comm[];
  postList: PostsListComponent;

  comsSubject = new Subject<Comm[]>();

  constructor(private route: ActivatedRoute) {
    this.getComs();
  }
  emitComs() {
    this.comsSubject.next(this.coms);
  }

  saveComs() {
    firebase.database().ref(`/blog/${0}/comment`).set(this.coms);
  }

  getComs() {
    firebase.database().ref(`/blog/comment`)
      .on('value', (data: DataSnapshot) => {
        this.coms = data.val() ? data.val() : [];

        this.emitComs();
      }
      );
  }

  getSingleCom() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`/comment`).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  createNewCom(newCom: Comm) {
    this.coms.push(newCom);
    this.saveComs();
    this.emitComs();
  }

  removeCom(comm: Comm) {
    const commIndexToRemove = this.coms.findIndex(
      (commEl) => {
        if (commEl === comm) {
          return true;
        }
      }
    );
    this.coms.splice(commIndexToRemove, 1);
    this.saveComs();
    this.emitComs();
  }
}
