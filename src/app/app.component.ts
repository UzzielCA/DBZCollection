import { Component } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

import * as firebase from "firebase/app";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Usuario } from "./Model/Usuario";
import { Carta } from "./Model/Carta";

export interface Shirt {
    name: string
}

export interface ShirtId {
    id: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dragon Ball Universe';
  usuarios: Observable<Usuario[]>;

  private itemCollection: AngularFirestoreCollection<Shirt>;
  item: Observable<ShirtId[]>;

  constructor(public db: AngularFirestore,
                public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe((auth) => {
        if (auth) {
            this.saveUSer(auth);
        }
    })





////////////////////////////////////////////////////////////////////////////////////////////////////////
      /*this.usuarios = db.collection('Usuarios').valueChanges();

      this.itemCollection = db.collection<Shirt>('Usuarios', (ref) => ref.where('id', '==', '1234'));
      this.item = this.itemCollection.stateChanges(['added'])
        .map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data() as Shirt;
              const id = a.payload.doc.id;
              console.log(id)
              return {id, data};
          })
      });
      this.item.forEach(variable => {
          console.log(variable);
      });

      this.usuarios.forEach(variable => {
          console.log(variable);
      });*/
  }

  saveUSer(auth) {
      const userDB = this.db.collection<Usuario>('Usuarios', (ref) => ref.where ('id', '==', auth.uid));
      const userChanges = userDB.valueChanges()
      userChanges.forEach(variable => {
          if (variable.length == 0) {
              userDB.add({id: auth.uid, name: auth.displayName});
          }
          console.log('usuario', variable.length);
      });
  }

  login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
      this.afAuth.auth.signOut();
  }
}
