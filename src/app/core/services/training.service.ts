import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  trainingManifestations(trainingDTO) {
    return this.http.post(
      environment.api + `/training/trainingManifestations/`,
      trainingDTO,
    );
  }

  trainingAlerts(trainingDTO) {
    return this.http.post(
      environment.api + `/training/trainingAlerts/`,
      trainingDTO,
    );
  }
}
