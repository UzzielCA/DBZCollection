import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";

import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Carta } from "../Model/Carta";

import { Overlay, overlayConfigFactory } from "angular2-modal";
import { Modal, BSModalContext } from "angular2-modal/plugins/bootstrap";
import { CardModalComponent } from "../card-modal/card-modal.component";


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [Modal]
})
export class CardsComponent implements OnInit {

  cards: Observable<any[]>;
  myCards: Observable<any[]>;
  constructor(public db: AngularFirestore,
                public afAuth: AngularFireAuth,
                public modal: Modal) {
    this.afAuth.authState.subscribe((auth) => {
        if (auth) {
            const myCardsCollection = this.db.collection<Carta>(auth.uid, (ref) => {
                return ref.orderBy('number');
            });
            this.myCards = myCardsCollection.snapshotChanges()
                .map((actions) => {
                    return actions.map((a) => {
                        const data = a.payload.doc.data() as Carta;
                        const id = a.payload.doc.id;
                        return {id, data};
                      });
                  });
        }
    })

  }

  ngOnInit() {
  }

  action(myCard) {
      this.afAuth.authState.subscribe((auth) => {
          if (auth) {
              if (myCard.data.isGotcha) {
                  // TODO: preguntar si se desea eliminar o guardar como repetida
                  this.openModal(auth.uid, myCard);
              } else {
                  myCard.data.isGotcha = true;
                  console.log(myCard.data);
                  const myCardsDoc = this.db.doc<Carta>(auth.uid+'/'+myCard.id);
                  myCardsDoc.update(myCard.data);
              }
          }
      })
  }

  openModal(uid, myCard){
      return this.modal.open(CardModalComponent, overlayConfigFactory({user: uid, key: myCard.id, card: myCard.data}, BSModalContext));
  }
}
