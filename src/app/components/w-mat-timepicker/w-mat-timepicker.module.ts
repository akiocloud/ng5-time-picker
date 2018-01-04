import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule, MatButtonToggleModule,
  MatDialogModule, MatIconModule, MatInputModule,
  MatSelectModule, MatToolbarModule,
  MatFormFieldModule,
  MatCardModule
} from '@angular/material';

import { WMatTimePickerComponent } from './w-mat-timepicker.component';
import { WTimeDialogComponent } from '../w-time-dialog/w-time-dialog.component';
import { WClockComponent } from '../w-clock/w-clock.component';
import { WTimeComponent } from '../w-time/w-time.component';

@NgModule({
  imports: [
    CommonModule,

    /****** Angular Material 2 components  ***********/
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,

    /******* Flexbox for alignment /*********/
    FlexLayoutModule,
  ],

  exports: [
    WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent,   
  ],

  declarations: [
    WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent,   
  ],

  entryComponents: [
    WMatTimePickerComponent,
    WTimeDialogComponent,
    WClockComponent,
    WTimeComponent,    
  ]
})
export class Ng5TimePickerModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng5TimePickerModule
    };
  }

}
