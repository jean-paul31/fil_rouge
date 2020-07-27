import { Injectable, Output, Directive } from '@angular/core';
import { Post } from '../model/posts.model';
import { Subject } from 'rxjs';
import  DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';


// @Directive()
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  @Output() posts: Post[] = [];
  idPost = 0;

  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
   }

  emitPosts() {
    this.postsSubject.next(this.posts);


  }

  savePosts() {
    firebase.database().ref(`/blog/${this.idPost}`).set(this.posts);
    this.idPost += 1;
  }

  getPosts() {
    firebase.database().ref(`/blog/${this.idPost}`)
      .on('value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];

        this.emitPosts();
      }
    );
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`/blog/${id}`).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
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
