import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { GuardianDTO } from 'src/app/core/models/guardianDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { GuardianService } from '../../../core/services/guardian.service';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css'],
})
export class DialogPatientComponent implements OnInit {
  patient: PatientDTO = null;
  guardians: GuardianDTO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPatientComponent>,
    private matDialog: MatDialog,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private guardianService: GuardianService
  ) {}

  ngOnInit(): void {
    this.patient = this.data;
    this.loadGuardians();
  }

  loadGuardians() {
    this.loadingService.changeStateShowLoading(true);
    this.guardianService.findByDni(this.data.userLoginDTO.dni).subscribe(
      (data: any) => {
        if (data.guardiansDTO) {
          this.guardians = data.guardiansDTO;
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }
}
