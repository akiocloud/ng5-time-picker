
import { Component, Input, Output, OnInit, Inject, EventEmitter } from '@angular/core';

import { CLOCK_TYPE, ITime } from '../w-clock/w-clock.component';

@Component({
  selector: 'w-time',
  template: `
      <div fxLayout="row" fxLayout.lt-md="column" fxLayoutAlign="center center" class="w-time" [ngClass.xs]="'vertical-time'" [ngClass.sm]="'vertical-time'">
      <mat-toolbar fxLayout="column"  fxLayout.lt-md="row" fxLayoutAlign="center center" [color]="color" class="w-timepicker-time-container">
          
          <div class="w-timepicker-selected-time">
              <span [class]="currentView === VIEW_HOURS ? 'active': ''" (click)="setCurrentView(VIEW_HOURS)">{{ formatHour() }}:</span>
              <span [class]="currentView === VIEW_MINUTES ? 'active': ''" (click)="setCurrentView(VIEW_MINUTES)">{{ formatMinute() }}</span>
          </div>
          <div fxLayout="column" fxLayoutAlign="center center" class="w-timepicker-selected-ampm" *ngIf="userTime.format === 12">
              <span (click)="setMeridien('AM')" [class]="userTime.meriden === 'AM' ? 'active' : ''">AM</span>
              <span (click)="setMeridien('PM')" [class]="userTime.meriden === 'PM' ? 'active' : ''">PM</span>
          </div>

      </mat-toolbar>

      <div fxLayout="column" fxLayoutAlign="space-between center" class="w-time-content">
          <w-clock [color]="color" class="w-animation-zoom" [userTime]="userTime" (userTimeChange)="emituserTimeChange($event)" [(currentView)]="currentView" (viewChange)="setCurrentView($event)"></w-clock>

          <div fxFlexAlign="end">
              <button mat-button (click)="revert()">{{revertLabel}}</button>
              <button mat-button [color]="color" (click)="submit()">{{submitLabel}}</button>
          </div>
      </div>
    </div>  
  `,

  styles: [` 
      :host {
        display: block;
      }
      
      .w-time {
        max-height: 100%;
        min-height: 350px;
        height: 350px;
      }
      
      .w-timepicker-time-container {
        padding: 15px;
        min-width: 160px;
        width: 160px;
      }
      
      .w-timepicker-time-container.mat-toolbar-single-row  {
          height: 100%;
      }
      .w-timepicker-selected-time {
        font-size: 3.5rem;
        font-weight: 400;
        display: flex;
      }
      .w-timepicker-selected-ampm {
        font-size: 1rem;
        line-height: 1.3rem;
        padding-top: 2rem;
      }
      .w-time-content {
        width: 100%;
        height: 100%;
        padding: 6px;
      }
      
      w-clock {
        padding: 12px 0;
        height: calc(100% - 58px);
      }  
      
      .w-time.vertical-time {
        height: auto;
      }
      
      .w-timepicker-selected-ampm {
        padding: 8px 12px;
      }
      
      .w-timepicker-selected-time > span, .w-timepicker-selected-ampm > span {
        outline: 0;
        opacity: 0.5;
      }
      
      .w-timepicker-selected-time > span:not(.active), .w-timepicker-selected-ampm > span:not(.active) {
        cursor: pointer;
      }
      
      .w-timepicker-selected-time > span.active, .w-timepicker-selected-ampm > span.active {
        opacity: 1;
      }
      
      .w-animate-next {
        opacity: 0;
        -webkit-transform: translate3d(50%, 0, 1px);
        transform: translate3d(50%, 0, 1px);
      }
      
      .w-animate-next-remove {
        -webkit-transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
        transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
        opacity: 0;
        -webkit-transform: translate3d(50%, 0, 1px);
        transform: translate3d(50%, 0, 1px);
      }
      
      .w-animate-next-remove-active {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 1px);
        transform: translate3d(0, 0, 1px);
      }
      
      .w-animate-prev {
        opacity: 0;
        -webkit-transform: translate3d(-50%, 0, 1px);
        transform: translate3d(-50%, 0, 1px);
      }
      
      .w-animate-prev-remove {
        -webkit-transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
        transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
        opacity: 0;
        -webkit-transform: translate3d(-50%, 0, 1px);
        transform: translate3d(-50%, 0, 1px);
      }
      
      .w-animate-prev-remove-active {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 1px);
        transform: translate3d(0, 0, 1px);
      }
      
      @-webkit-keyframes w-animation-bounce {
        from {
          opacity: 0;
          -webkit-transform: scale(0.95);
          transform: scale(0.95);
        }
      
        70% {
          opacity: 1;
          -webkit-transform: scale(1.05);
          transform: scale(1.05);
        }
      
        to {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      
      @keyframes w-animation-bounce {
        from {
          opacity: 0;
          -webkit-transform: scale(0.95);
          transform: scale(0.95);
        }
      
        70% {
          opacity: 1;
          -webkit-transform: scale(1.05);
          transform: scale(1.05);
        }
      
        to {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      
      .w-animation-zoom.ng-enter {
        -webkit-transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
        transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1);
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-name: w-animation-bounce;
        animation-name: w-animation-bounce;
      }
  `]

})
export class WTimeComponent implements OnInit {

  @Input() userTime: ITime;
  @Output() userTimeChange: EventEmitter<ITime> = new EventEmitter();

  @Input() revertLabel: string;
  @Input() submitLabel: string;

  @Output() onRevert: EventEmitter<null> = new EventEmitter();
  @Output() onSubmit: EventEmitter<ITime> = new EventEmitter();

  @Input() color: string;

  public VIEW_HOURS = CLOCK_TYPE.HOURS;
  public VIEW_MINUTES = CLOCK_TYPE.MINUTES;
  public currentView: CLOCK_TYPE = this.VIEW_HOURS;

  constructor() { }

  ngOnInit() {

    if (!this.userTime) {

      this.userTime = {

        hour: 6,
        minute: 0,
        meriden: 'PM',
        format: 12
      };
    }

    if (!this.revertLabel) {

      this.revertLabel = 'Cancel'
    }

    if (!this.submitLabel) {

      this.submitLabel = 'Okay'
    }
  }

  public formatHour(): string {

    if (this.userTime.hour === 24) {
      return '00';
    } else if (this.userTime.hour < 10) {
      return '0' + String(this.userTime.hour);
    } else {
      return String(this.userTime.hour);
    }
  }

  public formatMinute(): string {

    if (this.userTime.minute === 0) {
      return '00';
    } else if (this.userTime.minute < 10) {
      return '0' + String(this.userTime.minute);
    } else {
      return String(this.userTime.minute);
    }
  }

  public setCurrentView(type: CLOCK_TYPE) {

    this.currentView = type;
  }

  public setMeridien(m: 'PM' | 'AM') {

    this.userTime.meriden = m;
  }

  public revert() {

    this.onRevert.emit();
  }

  public submit() {

    this.onSubmit.emit(this.userTime);
  }

  public emituserTimeChange(event: string) {
    this.userTimeChange.emit(this.userTime);
  }
}
