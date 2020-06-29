import { Injectable, Output } from '@angular/core';
import { Comm } from '../model/com-model';

import { Subject } from 'rxjs';
import  DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
// import { PostsService } from './posts.service';
import { Post } from "../model/posts.model";


// @Directive()
@Injectable({
  providedIn: 'root'
})

export class CommsService {

  @Output() coms: Comm[];
  // route: ActivatedRoute  
  comsSubject = new Subject<Comm[]>();
  post: Post;
  postId = this.post.postId;
  // postsService: PostsService;
  
  constructor() {
    this.getComs(this.postId);

    
   }

  emitComs(){
    this.comsSubject.next(this.coms);

  }

  saveComs(id){   
    firebase.database().ref(`/blog/${id}/comment`).set(this.coms);

  }

  getComs(id){
    firebase.database().ref(`/blog/${id}/comment`)
      .on('value', (data: DataSnapshot)=>{
        this.coms = data.val() ? data.val() : [];

       this.emitComs();
      }
    );
  }

  getSingleCom(id){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref(`/comment/${id}`).once('value').then(
          (data: DataSnapshot)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  createNewCom(newCom: Comm){
    this.coms.push(newCom);
    this.saveComs(this.postId);
    this.emitComs();
  }

  removeCom(comm: Comm){
    const commIndexToRemove = this.coms.findIndex(
      (commEl)=>{
        if (commEl === comm) {
          return true;
        }
      }
    );
    this.coms.splice(commIndexToRemove, 1);
    this.saveComs(this.postId);
    this.emitComs();
  }
}
