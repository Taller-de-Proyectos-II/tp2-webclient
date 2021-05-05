import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/schedule/listSchedules/`
    );
  }

  listByPsychologistDni(psychologistDni) {
    return this.http.get(
        `https://app-tp2-api.herokuapp.com/schedule/listSchedulesByPsychologistDni/?psychologistDni=${psychologistDni}`
      );
  }

  listByPsychologistDniWithSessions(date, psychologistDni) {
    return this.http.get(
        `https://app-tp2-api.herokuapp.com/schedule/listSchedulesByPsychologistDniPatientView/?date=${date}&psychologistDni=${psychologistDni}`
      );
  }

  listSchedulesByPsychologistDniSessionsInSchedule(date, psychologistDni) {
    return this.http.get(
        `https://app-tp2-api.herokuapp.com/schedule/listSchedulesByPsychologistDniSessionsInSchedule/?date=${date}&psychologistDni=${psychologistDni}`
      );
  }

  update(scheduleDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com/schedule/`, scheduleDTO
    );
  }
}