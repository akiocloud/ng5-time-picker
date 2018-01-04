
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

// Current type to show
export enum CLOCK_TYPE {
    HOURS = 1,
    MINUTES = 2
}

export type TimeFormat = 12 | 24;

export interface ITime {

    hour: number;
    minute: number;
    meriden: 'PM' | 'AM';
    format: TimeFormat;
};

@Component({
    selector: 'w-clock',
    template: `
        <div fxLayout="row" fxLayoutAlign="center center" class="w-clock-wrapper">
            <div class="w-clock">
                <div class="w-clock-container">
                    
                    <!-- Clock center -->
                    <button  mat-mini-fab [color]="color" class="w-clock-center"></button>

                    <!-- Clock hand -->
                    <mat-toolbar [ngStyle]="getPointerStyle()" [color]="color" class="w-pointer">
                        <button mat-mini-fab [color]="color" class="w-clock-selected"></button>
                    </mat-toolbar>
                    
                    <!-- Hour / Minute number faces -->
                    <div *ngFor="let step of steps; let i = index" [class]="getTimeValueClass(step, i)" >
                        <button mat-mini-fab
                            [color]="selectedTimePart === step ? color : ''"
                            (click)="changeTimeValue(step)">
                            {{ step }}
                        </button>
                    </div>

                </div>
            </div>
        </div>`,

    styles: [`  
        .w-clock-wrapper {
            height: 100%;
            padding: 0 24px;
        
        }
        
        .w-clock {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        cursor: pointer;
        padding: 24px;
        background: #ededed;
        }
        .w-clock-container {
            width: 100%;
            height: 100%;
            position: relative;
            display: block;
        }
        .w-clock-center {
            height: 6px;
            width: 6px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border-radius: 50%;
        }
        .w-pointer {
            box-shadow: none;
            width: 1px;
            height: 50%;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0 auto;
            padding: 0;
            transform-origin: top center;
            transition: transform 200ms;
            z-index: 0;
            pointer-events: none;
        }
        .w-clock-step {
            display: block;
            position: absolute;
            transform: translate(-50%, -50%);
            transition: transform 200ms;
        }
        .w-clock-step .mat-mini-fab {
            box-shadow: none;
            background-color: transparent;
            }
        
        .w-clock-selected {
            position: absolute;
            bottom: -19px;
            left: -19px;
            min-width: 0;
            min-height: 0;
            pointer-events: none;
            box-shadow: none;
            cursor: none;
        }
            
        .w-clock-deg0 {
            top: 0%;
            left: 50%;
        }
        
        .w-clock-deg15 {
            top: 1.70370869%;
            left: 62.94095226%;
        }
        
        .w-clock-deg30 {
            top: 6.69872981%;
            left: 75%;
        }
        
        .w-clock-deg45 {
            top: 14.64466094%;
            left: 85.35533905%;
        }
        
        .w-clock-deg60 {
            top: 25%;
            left: 93.30127019%;
        }
        
        .w-clock-deg75 {
            top: 37.05904774%;
            left: 98.29629131%;
        }
        
        .w-clock-deg90 {
            top: 50%;
            left: 100%;
        }
        
        .w-clock-deg105 {
            top: 62.94095226%;
            left: 98.29629131%;
        }
        
        .w-clock-deg120 {
            top: 75%;
            left: 93.30127019%;
        }
        
        .w-clock-deg135 {
            top: 85.35533906%;
            left: 85.35533906%;
        }
        
        .w-clock-deg150 {
            top: 93.30127019%;
            left: 75%;
        }
        
        .w-clock-deg165 {
            top: 98.29629131%;
            left: 62.94095226%;
        }
        
        .w-clock-deg180 {
            top: 100%;
            left: 50%;
        }
        
        .w-clock-deg195 {
            top: 98.29629131%;
            left: 37.05904774%;
        }
        
        .w-clock-deg210 {
            top: 93.30127019%;
            left: 25%;
        }
        
        .w-clock-deg225 {
            top: 85.35533906%;
            left: 14.64466094%;
        }
        
        .w-clock-deg240 {
            top: 75%;
            left: 6.69872981%;
        }
        
        .w-clock-deg255 {
            top: 62.94095226%;
            left: 1.703708686%;
        }
        
        .w-clock-deg270 {
            top: 50%;
            left: 0%;
        }
        
        .w-clock-deg285 {
            top: 37.05904774%;
            left: 1.703708686%;
        }
        
        .w-clock-deg300 {
            top: 25%;
            left: 6.69872981%;
        }
        
        .w-clock-deg315 {
            top: 14.64466094%;
            left: 14.64466094%;
        }
        
        .w-clock-deg330 {
            top: 6.69872981%;
            left: 25%;
        }
        
        .w-clock-deg345 {
            top: 1.703708686%;
            left: 37.05904774%;
        }
        
        .w-clock-deg360 {
            top: 0%;
            left: 50%;
        }    
    `],
        
})
export class WClockComponent implements OnChanges {

    @Input() public userTime: ITime;
    @Output() public userTimeChange: EventEmitter<ITime> = new EventEmitter();

    @Input() public currentView: CLOCK_TYPE;
    @Output() public viewChange = new EventEmitter<CLOCK_TYPE>();

    @Input() public color: string;

    public steps = new Array<number>();
    private selectedTimePart: any;
    private STEP_DEG: number;



    ngOnChanges() {

        this.setupUI();
    }


    private setupUI() {

        this.steps = new Array<number>();

        switch (this.currentView) {

            case CLOCK_TYPE.HOURS:

                for (let i = 1; i <= this.userTime.format; i++) {

                    this.steps.push(i);
                    this.selectedTimePart = this.userTime.hour || 0;

                    if (this.selectedTimePart > this.userTime.format) {

                        this.selectedTimePart -= this.userTime.format;
                    }
                }
                break;

            case CLOCK_TYPE.MINUTES:

                for (let i = 5; i <= 55; i += 5) {

                    this.steps.push(i);
                }
                this.steps.push(0);
                this.selectedTimePart = this.userTime.minute || 0;
                break;
        }
    }

    public getPointerStyle() {

        let divider = 1;
        switch (this.currentView) {

            case CLOCK_TYPE.HOURS:
                divider = this.userTime.format;
                break;

            case CLOCK_TYPE.MINUTES:
                divider = 60;
                break;
        }

        let degrees = 0;
        if (this.currentView === CLOCK_TYPE.HOURS) {
            degrees = Math.round(this.userTime.hour * (360 / divider)) - 180;
        } else {
            degrees = Math.round(this.userTime.minute * (360 / divider)) - 180;
        }

        const style = {

            '-webkit-transform': 'rotate(' + degrees + 'deg)',
            '-ms-transform': 'rotate(' + degrees + 'deg)',
            'transform': 'rotate(' + degrees + 'deg)'
        };

        return style;
    }

    private getTimeValueClass(step: number, index: number) {

        if (this.currentView === CLOCK_TYPE.HOURS) {
            this.STEP_DEG = 360 / this.userTime.format;
        } else {
            this.STEP_DEG = 360 / 12;
        }
        let classes = 'w-clock-step w-clock-deg' + (this.STEP_DEG * (index + 1));

        if (this.selectedTimePart === step) {

            classes += ' mat-primary';
        }

        return classes;
    }

    private changeTimeValue(step: number) {

        if (this.currentView === CLOCK_TYPE.HOURS) {
            this.userTime.hour = step;

            // auto switch to minutes
            this.viewChange.emit(CLOCK_TYPE.MINUTES);
        } else {
            this.userTime.minute = step;

            // auto switch to hours
            this.viewChange.emit(CLOCK_TYPE.HOURS);
        }
        this.userTimeChange.emit(this.userTime)
    }
}
