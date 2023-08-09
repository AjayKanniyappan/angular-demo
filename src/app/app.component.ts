import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isButton = true;
  isDatePickerOpen: boolean = false;
  dateList: string[] = [];
  addDate: any;

  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.isButton = true;
    this.dateList = this.dataService.getDateList() || [];
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const getDate = new Date(event.value as unknown as string);
    const formattedDate = formatDate(getDate, 'MM-dd-yyyy', 'en-US');
    if (!this.dateList.includes(formattedDate)) {
      this.isButton = false;
      this.addDate = formattedDate;
      this.dateList.push(formattedDate);
    } else {
      this.snackBar.open('Entered date already exists', 'Ok');
    }
  }

  preventEditAndDelete(event: KeyboardEvent) {
    event.preventDefault();
  }

  saveDate() {
    this.dataService.addDate(this.addDate); // Use the DataService to add date
    this.isButton = true;
    this.snackBar.open('Date added Successfully', 'Ok');
  }

  myFilter(d: Date | null) {
    if (!d) {
      return false; // No date provided
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // Allow only today's date and future dates.
    return selectedDate >= today;
  }

  onDatePickerOpened() {
    this.isDatePickerOpen = true;
  }

  onDatePickerClosed() {
    this.isDatePickerOpen = false;
  }
}
