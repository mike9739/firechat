import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  constructor(public _chatService : ChatService) { 
    this._chatService.loadMessages().subscribe((mensajes:any[])=>{
      console.log(mensajes);
    })
  }

  ngOnInit() {
    
  }
  mensaje:string = ""
  send_message(){
    console.log(this.mensaje);
  }
}
