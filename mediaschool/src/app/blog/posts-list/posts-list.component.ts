import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/posts.model';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  post: Post[] = []

  constructor() { }

  ngOnInit() {
  }
   posts =
  [ 
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1"),
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1"),
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1"),
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1"),
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1"),
    new Post("Mon premier titre", "Madame Truc", "Lorem25", "https://i2.wp.com/mairie-rosporden.bzh/wp-content/uploads/2020/01/P1280763.jpg?fit=1030%2C581&ssl=1")
  ]

}
