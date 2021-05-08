import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManifestationService {
  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get(
      environment.api + `/manifestation/listManifestations/`
    );
  }
}
