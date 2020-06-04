import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from "../services/users.service";
import { User } from '../model/user-model';
import { Router } from '@angular/router';


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

  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })
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
  const newUser = new User(name, surname);
  if(this.fileUrl && this.fileUrl !== '') {
    newUser.img = this.fileUrl;
  }
  this.usersService.createNewUser(newUser);
  this.router.navigate(['/books']);
}

detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}

 

}
