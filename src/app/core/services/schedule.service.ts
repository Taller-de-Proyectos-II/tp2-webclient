import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/schedule/listSchedules/`
    );
  }

  listByPsychologistDni(psychologistDni) {
    return this.http.get(
        `http://tp2-api.us-east-1.elasticbeanstalk.com/schedule/listSchedulesByPsychologistDni/?psychologistDni=${psychologistDni}`
      );
  }

  listByPsychologistDniWithSessions(date, psychologistDni) {
    return this.http.get(
        `http://tp2-api.us-east-1.elasticbeanstalk.com/schedule/listSchedulesByPsychologistDniPatientView/?date=${date}&psychologistDni=${psychologistDni}`
      );
  }

  listSchedulesByPsychologistDniSessionsInSchedule(date, psychologistDni) {
    return this.http.get(
        `http://tp2-api.us-east-1.elasticbeanstalk.com/schedule/listSchedulesByPsychologistDniSessionsInSchedule/?date=${date}&psychologistDni=${psychologistDni}`
      );
  }

  update(scheduleDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/schedule/`, scheduleDTO
    );
  }
}