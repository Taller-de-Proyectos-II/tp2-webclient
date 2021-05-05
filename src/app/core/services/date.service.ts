import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private http: HttpClient) {}

  listDates(date) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/dates/listWeekDays/?date=${date}`
    );
  }
}