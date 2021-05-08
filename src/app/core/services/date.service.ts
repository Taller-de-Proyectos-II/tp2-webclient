import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor(private http: HttpClient) {}

  listDates(date) {
    return this.http.get(environment.api + `/dates/listWeekDays/?date=${date}`);
  }
}
