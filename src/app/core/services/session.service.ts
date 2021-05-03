import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  updateAcepted(sessionDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/session/updateAcepted/`,
      sessionDTO
    );
  }

  updateFinished(sessionDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/session/updateFinished/`,
      sessionDTO
    );
  }

  listPending(psychologistDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/session/listPendingByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listAcepted(psychologistDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/session/listAceptedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listFinished(psychologistDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/session/listFinishedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }
}
