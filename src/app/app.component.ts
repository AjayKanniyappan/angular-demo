import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isButton = true;
  dateList: string[] = [];
  addDate: any;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isButton = true;
    const data = localStorage.getItem('dateList');
    this.dateList = JSON.parse(data as string) || [];
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const getDate = new Date(event.value as unknown as string);
    const formattedDate = formatDate(getDate, 'MM-dd-yyyy', 'en-US');
    if (!this.dateList.includes(formattedDate)) {
      this.isButton = false;
      this.addDate = formattedDate;
      this.dateList.push(formattedDate);
    }
  }

  preventEditAndDelete(event: KeyboardEvent) {
    event.preventDefault();
  }

  saveDate() {
    const list = localStorage.getItem('dateList');
    const values = JSON.parse(list as string) || [];
    const existingIndex = values.findIndex(
      (date: any) => date === this.addDate
    );

    if (existingIndex === -1) {
      values.push(this.addDate);
      localStorage.setItem('dateList', JSON.stringify(values));
      this.isButton = true;
      this.snackBar.open('Date added Successfully', 'Ok');
    } else {
      this.snackBar.open('Entered date is already exist', 'Ok');
      this.isButton = true;
    }
  }

  myFilter = (d: Date | null): boolean => {
    if (!d) {
      return false; // No date provided
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // Allow only today's date and future dates.
    return selectedDate >= today;
  };
}
