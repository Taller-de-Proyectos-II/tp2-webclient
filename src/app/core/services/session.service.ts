import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  updateAcepted(sessionDTO) {
    return this.http.put(
      environment.api + `/session/updateAcepted/`,
      sessionDTO
    );
  }

  updateFinished(sessionDTO) {
    return this.http.put(
      environment.api + `/session/updateFinished/`,
      sessionDTO
    );
  }

  listPending(psychologistDni) {
    return this.http.get(
      environment.api +
        `/session/listPendingByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listAcepted(psychologistDni) {
    return this.http.get(
      environment.api +
        `/session/listAceptedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listFinished(psychologistDni) {
    return this.http.get(
      environment.api +
        `/session/listFinishedByPsychologistDni/?psychologistDni=${psychologistDni}`
    );
  }

  listFinishedByDni(psychologistDni, patientDni) {
    return this.http.get(
      environment.api +
        `/session/listFinishedByPsychologistDniAndPsychologistDni/?psychologistDni=${psychologistDni}&patientDni=${patientDni}`
    );
  }
}
