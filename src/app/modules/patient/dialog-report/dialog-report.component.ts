import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { ReportService } from 'src/app/core/services/report.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css'],
})
export class DialogReportComponent implements OnInit {
  reportFormGroup: FormGroup;
  title: string = 'Título de prueba';
  button: string = 'Botón de prueba';

  dataSourceTypes = ['Semanal', 'Mensual', 'Final'];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogReportComponent>,
    private router: Router,
    private matDialog: MatDialog,
    private reportService: ReportService,
    private patientService: PatientService,
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadReportFormGroup();
    if (this.data.action == 'create') {
      this.title = 'Nuevo Informe';
      this.button = 'Guardar';
    } else {
      this.reportFormGroup.patchValue(this.data.entity);
      this.title = 'Actualizar Informe';
      this.button = 'Actualizar';
      this.reportFormGroup.get('type').disable();
    }
  }

  loadReportFormGroup() {
    this.reportFormGroup = this.formBuilder.group({
      description: '',
      type: 'Semanal'
    });
  }

  save() {
    this.validate();
    if (this.reportFormGroup.valid) {
      var reportDTO;
      if (this.data.action == 'create') {
        this.loadingService.changeStateShowLoading(true);
        reportDTO = {
          description: this.reportFormGroup.get('description').value,
          patientDni: this.patientService.getPatient().userLoginDTO.dni,
          psychologistDni: this.psychologistService.getPsychologist()
            .userLoginDTO.dni,
          type: this.reportFormGroup.get('type').value
        };
        console.log(reportDTO);
        this.reportService.create(reportDTO).subscribe(
          (data: any) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info(data.message);
            if (data.status == 1) {
              this.matDialogRef.close(true);
            }
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
      } else {
        this.loadingService.changeStateShowLoading(true);
        reportDTO = {
          description: this.reportFormGroup.get('description').value,
          idReport: this.data.entity.idReport,
        };
        this.reportService.update(reportDTO).subscribe(
          (data: any) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info(data.message);
            if (data.status == 1) {
              this.matDialogRef.close(true);
            }
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
      }
    }
  }

  cancel() {
    this.matDialogRef.close(false);
  }

  validate() {
    if (!this.reportFormGroup.get('description').value) {
      this.reportFormGroup.get('description').setErrors({ required: true });
    }
  }

  deleteReport() {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se eliminará el informe seleccionado',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.reportService.delete(this.data.entity.idReport).subscribe(
            (data: any) => {
              this.snackBarService.info(data.message);
              this.loadingService.changeStateShowLoading(false);
              if (data.status == 1) {
                this.matDialogRef.close(true);
              }
            },
            (error) => {
              this.loadingService.changeStateShowLoading(false);
              this.snackBarService.info('Error en el servidor');
            }
          );
        }
      });
  }
}
