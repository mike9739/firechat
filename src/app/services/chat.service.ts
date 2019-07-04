import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>
  public chats:Message[]=[]
  constructor(private afs: AngularFirestore) { }
  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats')
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:Message[])=>{
        console.log(mensajes);
        this.chats= mensajes;
        return mensajes;
      })
    )
    
  }
  addMessage(text:string){
    //falta el id de usuario
    let message: Message ={
      nombre:'Test',
      mensaje:text,
      fecha:new Date().getTime()
    }
    return this.itemsCollection.add(message);

  }
}
