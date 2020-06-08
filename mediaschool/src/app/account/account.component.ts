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

  user: User[];
  usersSubscription: Subscription;
  


  constructor( private usersService: UsersService,
               private router: Router) { }
             

  ngOnInit() {
    this.usersSubscription = this.usersService.usersSubject.subscribe(
      (user: User[])=>{
        
        this.user = user;

      }
    );

    this.usersService.emitUser();    

      }
 
      ngOnDestroy(){
        this.usersSubscription.unsubscribe();
      }




}
