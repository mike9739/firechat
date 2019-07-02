import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  mensaje:string = ""
  send_message(){
    console.log(this.mensaje);
  }
}
