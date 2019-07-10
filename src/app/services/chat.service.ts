import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth}from '@angular/fire/auth'
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>
  public chats:Message[]=[]
  public usuario : any = {}
  constructor(private afs: AngularFirestore,private afAuth:AngularFireAuth) 
  {
    afAuth.authState.subscribe(user =>{
      console.log('Estado del usuario',user)
      if(!user){
        return
      }
      this.usuario.nombre= user.displayName;
      this.usuario.uid = user.uid;
    })
   }
  
  
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
  login(provider:string){
    if(provider==='google'){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    }
    else{
      this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider())
    }
  }
  logout(){
    this.usuario = {}
    this.afAuth.auth.signOut()
  }
  addMessage(text:string){
    //falta el id de usuario
    let message: Message ={
      nombre:this.usuario.nombre,
      mensaje:text,
      fecha:new Date().getTime(),
      uid:this.usuario.uid
    }
    return this.itemsCollection.add(message);

  }
}
