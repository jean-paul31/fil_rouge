import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsListComponent } from "../posts-list/posts-list.component";
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/posts.model';
import { DatePipe } from "@angular/common";



@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  lastUpdate: Date;


  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSavePost(){
    const text = this.postForm.get('message').value;
    const title = this.postForm.get('title').value;
    const createdAt = new Date(Date.now());
    const newPost = new Post(text, title, createdAt.toString());
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/blog']);
  };

  onBack(){
    this.router.navigate(['/blog']);
  }


}
