import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManifestationService {
  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/manifestation/listManifestations/`
    );
  }
}