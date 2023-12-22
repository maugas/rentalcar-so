import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgxPaginationModule } from 'ngx-pagination';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AdminModule } from './admin/admin.module';
import { RentsearchComponent } from './rentsearch/rentsearch.component';
import { RentavailableComponent } from './rentavailable/rentavailable.component';
import { RentbookingComponent } from './rentbooking/rentbooking.component';
import { CarService } from './services/car.service';
import { RentconfirmComponent } from './rentconfirm/rentconfirm.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RentsearchComponent,
    RentavailableComponent,
    RentbookingComponent,
    RentconfirmComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminModule,
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
