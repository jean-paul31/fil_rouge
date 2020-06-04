import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from "../services/users.service";
import { User } from '../model/user-model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  isregister = false;
  

  constructor(private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })

    
  }
  onDeleteUser(user: User){
    this.usersService.removeUser(user);
    this.router.navigate(['/blog']);
  }
 

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.usersService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  onSaveUser() {
    const name = this.userForm.get('name').value;
    const surname = this.userForm.get('surname').value;
    const email = this.userForm.get('email').value;
    const newUser = new User(name, surname, email);
    if (this.fileUrl && this.fileUrl !== '') {
      newUser.photo = this.fileUrl;
    }
    this.usersService.createNewUser(newUser);
    this.router.navigate(['/blog']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }



}
