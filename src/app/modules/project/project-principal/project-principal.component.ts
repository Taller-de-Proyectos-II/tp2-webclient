import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-project-principal',
  templateUrl: './project-principal.component.html',
  styleUrls: ['./project-principal.component.css'],
})
export class ProjectPrincipalComponent implements OnInit {
  selectedFile: File = null;
  retrieveURL = '../../../assets/images/photo.png';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getImage();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const dni = '77777777';
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http
      .post(`https://app-tp2-api.herokuapp.com/patient/image/?dni=${dni}`, formData)
      .subscribe((res) => {
        this.getImage();
      });
  }

  getImage() {
    const dni = '77777777';

    this.http
      .get(`https://app-tp2-api.herokuapp.com/patient/image/?dni=${dni}`, {
        responseType: 'blob',
      })
      .subscribe((data: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (_event) => {
          this.retrieveURL = reader.result as string;
        };
      });
  }
}
