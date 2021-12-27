import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../../model/posts.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
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
              private router: Router
              ) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (article: Post[]) => {
        this.post = article;
        console.log(this.post);
      }
    );
    this.postsService.emitPosts();
    
  }
  onNewpost() {
    this.router.navigate(['/blog', 'new']);

  }


  onDeletePost(post: Post) {
    this.postsService.removePost(post);
    this.router.navigate(['/blog']);
  }
  onViewPost(id: number) {
    this.router.navigate(['/blog', 'article', id]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
