import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { BookComponent }  from "./book.component";
import { BookService } from './book.service';

@NgModule({
  imports: [
        BrowserModule,
		    HttpModule,
		    ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		    BookComponent
  ],
  providers: [
        BookService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
