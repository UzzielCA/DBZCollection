import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule} from "angularfire2/auth";
import { environment } from "../environments/environment";

import { AppRoutingModule } from './app.routing';

import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './card-modal/card-modal.component';

import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [CardModalComponent]
})
export class AppModule { }
