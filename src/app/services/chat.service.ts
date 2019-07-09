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
    this.itemsCollection = this.afs.collection<Message>('chats',ref => ref.orderBy('fecha','desc').limit(10))
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:Message[])=>{
        this.chats = []
        for (const mensaje of mensajes) {
            this.chats.unshift(mensaje)          
        }
        return this.chats;
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
