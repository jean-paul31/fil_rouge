import { Component, OnInit } from '@angular/core';
import { Child } from 'src/app/model/child-model';
import { Subscription } from 'rxjs';
import { ChildServiceService } from 'src/app/services/child-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.css']
})
export class ChildrenListComponent implements OnInit {

  children: Child;
  childSubscription: Subscription;

  constructor(private ChildService: ChildServiceService,
              private router: Router) { }

  ngOnInit() {
  }

}
