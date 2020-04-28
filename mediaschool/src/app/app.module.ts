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

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'blog', canActivate:[AuthGuardService], component: BlogComponent},
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

