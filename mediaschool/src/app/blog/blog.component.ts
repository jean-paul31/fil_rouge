import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  isClicked = false;

  constructor() { }

  ngOnInit() {
  }

  newMessage(){
    this.isClicked = !this.isClicked;
  }

}
