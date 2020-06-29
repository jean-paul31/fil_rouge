import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Comm } from "../../model/com-model";
import { Router, ActivatedRoute } from '@angular/router';
import { SinglePostComponent } from "../single-post/single-post.component";
import { CommsService } from '../../services/comms-service.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/posts.model';


@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit, OnDestroy {

  comsForm: FormGroup;
  coms: Comm[];
  comsSubscription: Subscription;
  post: Post;



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
  ngOnDestroy(){
    this.comsSubscription.unsubscribe();
  }
}
