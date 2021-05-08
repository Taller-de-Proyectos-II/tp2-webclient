import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { PatientDTO } from '../models/patientDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients: PatientDTO[] = null;
  patient: PatientDTO = null;

  constructor(private http: HttpClient) {}

  findByPsicholosgitDni(dni) {
    return this.http.get(
      environment.api + `/patient/listByPsychologistDni/?psychologistDni=${dni}`
    );
  }

  findByDni(dni) {
    return this.http.get(environment.api + `/patient/listByDni/?dni=${dni}`);
  }

  assignToPsychologist(patientDni, psychologistDni) {
    return this.http.get(
      environment.api +
        `/patient/assignToPsychologist/?patientDni=${patientDni}&psychologistDni=${psychologistDni}`
    );
  }

  removePsychologist(patientDni) {
    return this.http.get(
      environment.api + `/patient/removePsychologist/?patientDni=${patientDni}`
    );
  }

  getPatients() {
    return this.patients;
  }

  setPatients(patients) {
    this.patients = patients;
  }

  getPatient() {
    return this.patient;
  }

  setPatient(patient) {
    this.patient = patient;
  }
}
