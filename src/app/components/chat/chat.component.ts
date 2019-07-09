import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje:string = ""
  elemto:any;

  constructor(public _chatService : ChatService) { 
    this._chatService.loadMessages().subscribe((mensajes:any[])=>{
     setTimeout(()=>{
      this.elemto.scrollTop = this.elemto.scrollHeight
     },20)
    })
  }

  ngOnInit() {
    this.elemto = document.getElementById('app-mensajes')
  }

  send_message(){
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
     return 
    }
    this._chatService.addMessage(this.mensaje).then(()=>{
      console.log('Mensaje enviado');
    }).catch(()=>{console.error('No se pudo enviar')})
    
  }
}
