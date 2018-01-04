import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatCardModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Ng5TimePickerModule } from './components/w-mat-timepicker/w-mat-timepicker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    Ng5TimePickerModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
