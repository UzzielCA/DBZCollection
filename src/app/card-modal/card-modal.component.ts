import { Component, OnInit } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext} from "angular2-modal/plugins/bootstrap";

import { Carta } from "../Model/Carta";

export class CustomModalContext extends BSModalContext {
    public user: string;
    public card: Carta;
    public key: string;
}

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;
  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>) {
      this.context = dialog.context
      this.wrongAnswer = true;
      dialog.setCloseGuard(this);
  }

  saveCard(){
      console.log('saveCard');
  }

  deleteCard(){
      console.log('deleteCard');
  }

  closeModal(){
    this.wrongAnswer = false;
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }
}
