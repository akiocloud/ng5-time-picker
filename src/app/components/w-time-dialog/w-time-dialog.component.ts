import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CLOCK_TYPE, ITime } from '../w-clock/w-clock.component';

@Component({
   selector: 'w-time-dialog',
   template: `
    <div mat-dialog-content class="w-timepicker-dialog">
        <w-time [color]="color" [userTime]="userTime" (onRevert)="revert()" (onSubmit)="submit()"></w-time>
    </div>`,
    
   styles: [`
        .w-timepicker-dialog {
            padding: 0;
            margin: -24px;
            width: calc(100% + 48px);
        }
    `]
    
})
export class WTimeDialogComponent {    

    public userTime: ITime;
    private VIEW_HOURS = CLOCK_TYPE.HOURS;
    private VIEW_MINUTES = CLOCK_TYPE.MINUTES;
    private currentView: CLOCK_TYPE = this.VIEW_HOURS;

    constructor(
        //@Inject(MAT_DIALOG_DATA) private data: { time: ITime, color: string },
        @Inject(MAT_DIALOG_DATA) private data: any,
        @Inject(MAT_DIALOG_DATA) public color: string,
        private dialogRef: MatDialogRef<WTimeDialogComponent>) {

        this.userTime = data.time;
        this.color = data.color;
    }

    public revert() {

        this.dialogRef.close(-1);
    }

    public submit() {

        this.dialogRef.close(this.userTime);
    }
}
