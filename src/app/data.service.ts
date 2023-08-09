import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dateList: string[] = ['08-08-2023', '08-09-2023', '08-10-2023'];

  constructor() {}

  getDateList(): string[] {
    return this.dateList;
  }

  addDate(date: string) {
    if (!this.dateList.includes(date)) {
      this.dateList.push(date);
    }
  }
}
