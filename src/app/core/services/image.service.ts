import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  psychologistImage: string = null;

  constructor(private http: HttpClient) {}

  getPsychologistImageFromApi(dni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com//psychologist/image/?dni=${dni}`,
      {
        responseType: 'blob',
      }
    );
  }

  setPsychologistImageInApi(dni, selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.http.post(
      `https://app-tp2-api.herokuapp.com//psychologist/image/?dni=${dni}`,
      formData
    );
  }

  setPsychologistImage(psychologistImage) {
    this.psychologistImage = psychologistImage;
  }

  getPsychologistImage() {
    return this.psychologistImage;
  }
}
