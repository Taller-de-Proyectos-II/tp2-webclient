import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(environment.api + `/schedule/listSchedules/`);
  }

  listByPsychologistDni(psychologistDni) {
    return this.http.get(
      environment.api +
        `/schedule/listSchedulesByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listByPsychologistDniWithSessions(date, psychologistDni) {
    return this.http.get(
      environment.api +
        `/schedule/listSchedulesByPsychologistDniPatientView/?date=${date}&psychologistDni=${psychologistDni}`
    );
  }

  listSchedulesByPsychologistDniSessionsInSchedule(date, psychologistDni) {
    return this.http.get(
      environment.api +
        `/schedule/listSchedulesByPsychologistDniSessionsInSchedule/?date=${date}&psychologistDni=${psychologistDni}`
    );
  }

  update(scheduleDTO) {
    return this.http.put(environment.api + `/schedule/`, scheduleDTO);
  }
}
