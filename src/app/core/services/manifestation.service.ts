import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ManifestationService {
  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/manifestation/listManifestations/`
    );
  }
}