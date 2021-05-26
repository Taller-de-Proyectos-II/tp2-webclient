import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuardianDTO } from 'src/app/core/models/guardianDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { ImageService } from 'src/app/core/services/image.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css'],
})
export class DialogPatientComponent implements OnInit {
  patientDni: string = '';
  guardians: GuardianDTO[] = [];
  patient: PatientDTO = {
    description: '',
    idPatient: 0,
    lastNames: '',
    names: '',
    birthday: '',
    email: '',
    phone: '',
    userLoginDTO: {
      dni: '',
      password: '',
    },
    imageURL: '../../../assets/images/photo.png'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPatientComponent>,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private patientService: PatientService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.patientDni = this.data;
    this.loadPatient();
  }

  loadPatient() {
    this.loadingService.changeStateShowLoading(true);
    this.patientService.findByDni(this.patientDni).subscribe(
      (data: any) => {
        if (data.patientDTO) {
          this.patient = data.patientDTO;
          this.patient.imageURL = '../../../assets/images/photo.png';
        }
        this.loadingService.changeStateShowLoading(false);
        this.loadPhoto();
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  loadPhoto() {
    this.patient.imageURL = '../../../assets/images/loading.gif';
    var retrieveURL = '../../../assets/images/loading.gif';
    this.imageService.getPatientImageFromApi(this.patientDni).subscribe(
      (data: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (_event) => {
          retrieveURL = reader.result as string;
          this.patient.imageURL = retrieveURL;
        };
      },
      (error) => {
        retrieveURL = '../../../assets/images/photo.png';
        this.patient.imageURL = retrieveURL;
      }
    );
  }

  cancel() {
    this.matDialogRef.close();
  }
}
