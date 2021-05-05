import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { ReportDTO } from 'src/app/core/models/reportDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { ReportService } from 'src/app/core/services/report.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

import { DialogReportComponent } from '../dialog-report/dialog-report.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportsSemanal: ReportDTO[] = [];
  reportsMensual: ReportDTO[] = [];
  reportsFinal: ReportDTO[] = [];
  patient: PatientDTO = null;

  constructor(
    private formBuilder: FormBuilder,
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      if (this.patientService.getPatient() == null) {
        this.router.navigate(['/patients']).then();
      } else {
        this.patient = this.patientService.getPatient();
        this.getReports();
      }
    }
  }

  getReports() {
    this.loadingService.changeStateShowLoading(true);
    this.reportService
      .listAllByType(this.patient.userLoginDTO.dni, 'Final')
      .subscribe((dataFinal: any) => {
        if (dataFinal.reportsDTO) {
          this.reportsFinal = dataFinal.reportsDTO;
          console.log(dataFinal.reportsDTO);
        }
      });
    this.reportService
      .listAllByType(this.patient.userLoginDTO.dni, 'Mensual')
      .subscribe((dataMensual: any) => {
        if (dataMensual.reportsDTO) {
          this.reportsMensual = dataMensual.reportsDTO;
          console.log(dataMensual.reportsDTO);
        }
      });
    this.reportService
      .listAllByType(this.patient.userLoginDTO.dni, 'Semanal')
      .subscribe(
        (dataSemanal: any) => {
          if (dataSemanal.reportsDTO) {
            this.reportsSemanal = dataSemanal.reportsDTO;
            console.log(dataSemanal.reportsDTO);
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }

  createReport() {
    this.matDialog
      .open(DialogReportComponent, {
        disableClose: true,
        data: {
          action: 'create',
        },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm == true) {
          this.getReports();
        }
      });
  }

  delete(report) {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se eliminará el informe seleccionado',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.reportService.delete(report.idReport).subscribe(
            (data: any) => {
              this.snackBarService.info(data.message);
              this.loadingService.changeStateShowLoading(false);
              if (data.status == 1) {
                this.reportsSemanal = [];
                this.reportsMensual = [];
                this.reportsFinal = [];
                this.getReports();
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
