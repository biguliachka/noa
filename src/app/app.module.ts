import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuComponent} from './components/menu/menu.component';
import {MatDialogModule} from "@angular/material/dialog";

import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';

import {HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./components/auth/auth.component";
import {ProductCategoryModule} from "./pages/product-category/product-category.module";
import {BasketComponent} from "./components/basket/basket.component";
import { TypeDostavkyComponent } from './components/type-dostavky/type-dostavky.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AuthComponent,
    BasketComponent,
    TypeDostavkyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ProductCategoryModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
