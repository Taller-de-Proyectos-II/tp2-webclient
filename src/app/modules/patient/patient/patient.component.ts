import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { ImageService } from 'src/app/core/services/image.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

import { PatientDTO } from '../../../core/models/patientDTO.model';
import { PatientService } from '../../../core/services/patient.service';
import { PsychologistService } from '../../../core/services/psychologist.service';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  dniFormGroup: FormGroup;
  patients: PatientDTO[] = [];
  patientFound: PatientDTO = null;
  searchPatient: boolean = false;
  retrieveURL: any = '../../../assets/images/loading.gif';
  psychologist: PsychologistDTO = null;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadDniFormGroup();
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
      if (this.patientService.getPatients() == null) {
        this.setInService();
      } else this.patients = this.patientService.getPatients();
    }
  }

  loadDniFormGroup() {
    this.dniFormGroup = this.formBuilder.group({
      dni: '',
    });
  }

  loadPhoto(dni) {
    let index = this.patientService
      .getPatients()
      .findIndex((element) => element.userLoginDTO.dni == dni);
    var retrieveURL = '../../../assets/images/loading.gif';
    this.patientService.patients[index].imageURL = retrieveURL;
    this.imageService.getPatientImageFromApi(dni).subscribe(
      (data: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (_event) => {
          retrieveURL = reader.result as string;
          this.patientService.patients[index].imageURL = retrieveURL;
        };
      },
      (error) => {
        retrieveURL = '../../../assets/images/photo.png';
        this.patientService.patients[index].imageURL = retrieveURL;
      }
    );
  }

  loadPhotoSearch(dni) {
    this.retrieveURL = '../../../assets/images/loading.gif';
    this.imageService.getPatientImageFromApi(dni).subscribe(
      (data: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = (_event) => {
          this.retrieveURL = reader.result as string;
        };
      },
      (error) => {
        this.retrieveURL = '../../../assets/images/photo.png';
      }
    );
  }

  setInService() {
    this.loadingService.changeStateShowLoading(true);
    this.patientService
      .findByPsicholosgitDni(this.psychologist.userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          if (data.patientsDTO) {
            this.patientService.setPatients(data.patientsDTO);
          } else {
            this.patientService.setPatients([]);
          }
          this.patients = this.patientService.getPatients();
          this.loadingService.changeStateShowLoading(false);
          this.patients.forEach((element) => {
            this.loadPhoto(element.userLoginDTO.dni);
          });
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
  }

  searchPatientByDni() {
    this.validate();
    if (this.dniFormGroup.valid) {
      this.loadingService.changeStateShowLoading(true);
      this.patientService
        .findByDni(this.dniFormGroup.get('dni').value)
        .subscribe(
          (data: any) => {
            this.searchPatient = true;
            if (data.patientDTO) {
              this.patientFound = data.patientDTO;
              this.loadPhotoSearch(this.patientFound.userLoginDTO.dni);
            } else this.patientFound = null;
            this.loadingService.changeStateShowLoading(false);
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
    }
  }

  validate() {
    if (!this.dniFormGroup.get('dni').value) {
      this.dniFormGroup.get('dni').setErrors({ required: true });
    }
  }

  beforeRemove(patient: PatientDTO) {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se eliminará la asignación del paciente',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.remove(patient);
        }
      });
  }

  assign(patient: PatientDTO) {
    this.loadingService.changeStateShowLoading(true);
    this.patientService
      .assignToPsychologist(
        patient.userLoginDTO.dni,
        this.psychologist.userLoginDTO.dni
      )
      .subscribe(
        (data: any) => {
          this.snackBarService.info(data.message);
          if (data.status == 1) {
            patient.imageURL = this.retrieveURL;
            this.patients = this.patients.concat(patient);
            this.patientService.setPatients(this.patients);
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
  }

  remove(patient: PatientDTO) {
    this.loadingService.changeStateShowLoading(true);
    this.patientService.removePsychologist(patient.userLoginDTO.dni).subscribe(
      (data: any) => {
        this.snackBarService.info(data.message);
        this.loadingService.changeStateShowLoading(false);
        if (data.status == 1) {
          this.setInService();
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  openDialog(patient: PatientDTO) {
    this.matDialog.open(DialogPatientComponent, {
      disableClose: true,
      data: patient,
    });
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }

  goTest(patient) {
    this.patientService.setPatient(patient);
    this.redirectTo('/patients/tests');
  }

  goReport(patient) {
    this.patientService.setPatient(patient);
    this.redirectTo('/patients/reports');
  }

  goAlert(patient) {
    this.patientService.setPatient(patient);
    this.redirectTo('/patients/alerts');
  }

  goDashboard(patient) {
    this.patientService.setPatient(patient);
    this.redirectTo('/patients/dashboard');
  }
}
