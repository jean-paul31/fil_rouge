import { Injectable } from '@angular/core';
import { Post } from '../model/posts.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { create } from 'domain';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() { }

  emitPosts(){
    this.postsSubject.next(this.posts);
  }

  savePosts(){
    firebase.database().ref('blog').set(this.posts);
  }

  getPosts(){
    firebase.database().ref('/blog').on('value', (data)=>{
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  getSinglePost(id: number){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/blog/' + id).once('value').then(
          (data)=>{
            resolve(data.val());
          }, (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post){
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post){
    const postIndexToRemove = this.posts.findIndex(
      (postEl)=>{
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
}
