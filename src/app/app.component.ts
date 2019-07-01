import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public chats:Observable<any[]>
  constructor(db:AngularFirestore){
    db.collection('chats').valueChanges()
  }
  title = 'Firechat';
 
}
