import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";

import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { BSModalContext} from "angular2-modal/plugins/bootstrap";

import { Carta } from "../Model/Carta";

export class CustomModalContext extends BSModalContext {
    public user: string;
    public key: string;
    public card: Carta;
}

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements CloseGuard, ModalComponent<CustomModalContext> {

  context: CustomModalContext;
  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<CustomModalContext>,
                public db: AngularFirestore) {
      this.context = dialog.context
      this.wrongAnswer = true;
      dialog.setCloseGuard(this);
  }

  saveCard(){
      this.context.card.repeated = this.context.card.repeated + 1;
      const myCardsDoc = this.db.doc<Carta>(this.context.user+'/'+this.context.key);
      myCardsDoc.update(this.context.card);
      this.wrongAnswer = false;
      this.dialog.close();
  }

  deleteCard(){
      if (this.context.card.repeated > 0) {
          let isRepeated = this.context.card.repeated - 1;
          if (isRepeated >= 0) {
              this.context.card.repeated = isRepeated;
          } else {
              this.context.card.repeated = isRepeated;
              this.context.card.isGotcha = false;
          }
      } else {
          this.context.card.isGotcha = false;
      }
      const myCardsDoc = this.db.doc<Carta>(this.context.user+'/'+this.context.key);
      myCardsDoc.update(this.context.card);
      this.wrongAnswer = false;
      this.dialog.close();
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
