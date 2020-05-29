import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../../model/posts.model';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  post: Post[];
  postsSubscription: Subscription;


  constructor(private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (post: Post[])=>{
        this.post = post;
      }
    );
    this.postsService.emitPosts();
  }

  onNewpost(){
    this.router.navigate(['/blog/new']);
  }


  onDeletePost(post: Post){
    this.postsService.removePost(post);
  }

  onViewPost(id: number){
    this.router.navigate(['/blog', 'view', +id]);
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }




}
