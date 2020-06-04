import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDOWCUxRZZssPySxwYPMlGCGoKbch_etAw",
      authDomain: "mediaschool-28f25.firebaseapp.com",
      databaseURL: "https://mediaschool-28f25.firebaseio.com",
      projectId: "mediaschool-28f25",
      storageBucket: "mediaschool-28f25.appspot.com",
      messagingSenderId: "8828409192",
      appId: "1:8828409192:web:d6e4cd72a90f9ddc02b2dd"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
}
