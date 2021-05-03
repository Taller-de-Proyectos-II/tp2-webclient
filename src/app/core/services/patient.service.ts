import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
      `http://tp2-api.us-east-1.elasticbeanstalk.com/patient/listByPsychologistDni/?psychologistDni=${dni}`
    );
  }

  findByDni(dni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/patient/listByDni/?dni=${dni}`
    );
  }

  assignToPsychologist(patientDni, psychologistDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/patient/assignToPsychologist/?patientDni=${patientDni}&psychologistDni=${psychologistDni}`
    );
  }

  removePsychologist(patientDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/patient/removePsychologist/?patientDni=${patientDni}`
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
