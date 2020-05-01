import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/posts.model';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  post: Post[] = [];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    43mins:55
  }


}
