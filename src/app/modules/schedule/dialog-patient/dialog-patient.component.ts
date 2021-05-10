import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { GuardianDTO } from 'src/app/core/models/guardianDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { GuardianService } from 'src/app/core/services/guardian.service';
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
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPatientComponent>,
    private matDialog: MatDialog,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private guardianService: GuardianService,
    private patientService: PatientService
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
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  cancel() {
    this.matDialogRef.close();
  }
}
