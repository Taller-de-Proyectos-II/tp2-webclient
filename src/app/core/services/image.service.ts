import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  psychologistImage: string = null;

  constructor(private http: HttpClient) {}

  getPsychologistImageFromApi(dni) {
    return this.http.get(environment.api + `/psychologist/image/?dni=${dni}`, {
      responseType: 'blob',
    });
  }

  setPsychologistImageInApi(dni, selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post(
      environment.api + `/psychologist/image/?dni=${dni}`,
      formData
    );
  }

  setPsychologistImage(psychologistImage) {
    this.psychologistImage = psychologistImage;
  }

  getPsychologistImage() {
    return this.psychologistImage;
  }

  getPatientImageFromApi(dni) {
    return this.http.get(environment.api + `/patient/image/?dni=${dni}`, {
      responseType: 'blob',
    });
  }

  setPatientImageInApi(dni, selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post(
      environment.api + `/patient/image/?dni=${dni}`,
      formData
    );
  }

  getGuardianImageFromApi(dni, patientDni) {
    return this.http.get(environment.api + `/guardian/image/?dni=${dni}&patientDni=${patientDni}`, {
      responseType: 'blob',
    });
  }

  setGuardianImageInApi(dni, patientDni, selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post(
      environment.api + `/guardian/image/?dni=${dni}&patientDni=${patientDni}`,
      formData
    );
  }
}
