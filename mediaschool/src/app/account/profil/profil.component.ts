import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/model/user-model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  isregister = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private usersService: UsersService,
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
                this.router.navigate(['/account']);
              }

              detectFiles(event) {
                this.onUploadFile(event.target.files[0]);
              }




}
