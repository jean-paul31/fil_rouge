import { Component, OnInit, Output } from '@angular/core';
import { Post } from "../../model/posts.model";
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post: Post;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.post = new Post('', '', '');
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post:Post)=>{
        this.post = post;
      }
    );
  }
  onDeletePost(post: Post){
    this.postsService.removePost(post);
    this.router.navigate(['/blog']);
  }

  onBack(){
    this.router.navigate(['/blog']);
  }

}
