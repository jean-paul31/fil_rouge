import { Component, OnInit } from '@angular/core';
import { Post } from "../../model/posts.model";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
