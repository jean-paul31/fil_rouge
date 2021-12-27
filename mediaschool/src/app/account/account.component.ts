import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user-model';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy   {

  users: User;
  usersSubscription: Subscription;
  isClicked = false;



  constructor( private usersService: UsersService,
               private router: Router) { }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (users) => {

        users = users;
        console.log(this.users);

      }
    );

    this.usersService.emitUser();

      }

      mod() {
        this.isClicked = !this.isClicked;
      }
      ngOnDestroy() {
        this.usersSubscription.unsubscribe();
      }




}
