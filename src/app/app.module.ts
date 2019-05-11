import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SearchComponent } from './components/search/search.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { DetailsComponent } from './components/details/details.component';
import { CollectionsComponent } from './components/collections/collections.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavComponent,
    DetailsComponent,
    CollectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
