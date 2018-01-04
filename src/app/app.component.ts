import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
  selectedTime = '7H 15 min PM';

  constructor(private snackBar: MatSnackBar) {}
  
  public onRevert() {
    this.exportTime =  { hour: 7, minute: 15, meriden: 'PM', format: 12 };
    
    this.snackBar.open(`Revert time to ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
      duration: 500,
    });
  }

  public onSubmit(time) {
    this.snackBar.open(`Saved time ${this.exportTime.hour}:${this.exportTime.minute} ${this.exportTime.meriden}`, null, {
      duration: 500,
    });
  }

  displayTime(event) {
    this.selectedTime = event.hour + "H" + event.minute + " min " + event.meriden;
    console.log(event)
  }
}
