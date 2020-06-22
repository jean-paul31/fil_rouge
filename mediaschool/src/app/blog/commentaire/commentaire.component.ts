import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Comm } from "../../model/com-model";
import { Router, ActivatedRoute } from '@angular/router';
import { CommsService } from '../../services/comms-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {

  comsForm: FormGroup;
  coms: Comm[];
  // id= this.route.snapshot.params['id']
  comsSubscription: Subscription;



  constructor(private formBuilder: FormBuilder,
              private commsService: CommsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.comsSubscription = this.commsService.comsSubject.subscribe(
      (commentaire: Comm[])=>{
        this.coms = commentaire;

      }
    );

    this.commsService.emitComs();


  }

  initForm(){
    this.comsForm = this.formBuilder.group({
      text: ['', Validators.required]
    })
  }

  onSaveCom(){
    const text = this.comsForm.get('text').value;
    const emmitedAt = new Date(Date.now());
    const newCom = new Comm(text, emmitedAt.toString());
    this.commsService.createNewCom(newCom);
    this.router.navigate(['/blog']);

  };

  onBack(){
    this.router.navigate(['/blog']);
  }
}
