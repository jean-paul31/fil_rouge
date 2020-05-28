import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from './form/form.component';
import { BlogComponent } from './blog/blog.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountComponent } from './account/account.component';
import { AddChildComponent } from './account/add-child/add-child.component';
import { CanteenComponent } from './account/canteen/canteen.component';
import { ChildrenListComponent } from './account/children-list/children-list.component';
import { SingleChildComponent } from './account/single-child/single-child.component';
import { PostsListComponent } from './blog/posts-list/posts-list.component';
import { SinglePostComponent } from './blog/single-post/single-post.component';
import { AddPostComponent } from './blog/add-post/add-post.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'blog', canActivate:[AuthGuardService], component: BlogComponent},
  {path: 'new', canActivate:[AuthGuardService], component: AddPostComponent },
  {path: 'account', canActivate:[AuthGuardService], component: AccountComponent},
  {path: 'add-child', canActivate:[AuthGuardService], component: AddChildComponent},
  {path: 'canteen', canActivate:[AuthGuardService], component: CanteenComponent},
  {path: '', redirectTo: 'blog', pathMatch: 'full'},
  {path: '**', redirectTo: 'blog'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    BlogComponent,
    SignupComponent,
    SigninComponent,
    AccountComponent,
    AddChildComponent,
    CanteenComponent,
    ChildrenListComponent,
    SingleChildComponent,
    PostsListComponent,
    SinglePostComponent,
    AddPostComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})





export class AppModule {

 }

