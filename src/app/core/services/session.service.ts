import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  updateAcepted(sessionDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com//session/updateAcepted/`,
      sessionDTO
    );
  }

  updateFinished(sessionDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com//session/updateFinished/`,
      sessionDTO
    );
  }

  listPending(psychologistDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com//session/listPendingByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listAcepted(psychologistDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com//session/listAceptedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listFinished(psychologistDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com//session/listFinishedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }
}
