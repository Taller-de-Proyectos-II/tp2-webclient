import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DateService } from 'src/app/core/services/date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  patient: PatientDTO = null;
  startDate = '';
  endDate = '';

  constructor(
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private dashboardService: DashboardService,
    private dateService: DateService,
    private router: Router
  ) {}
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartLabelsAnsiedad: Label[] = [
    'Sin respuesta',
    'No hay ansiedad presente',
    'Ansiedad leve',
    'Ansiedad severa',
    'Ansiedad grave',
  ];
  public doughnutChartDataAnsiedad: MultiDataSet = [[0, 0, 0, 0, 0]];

  public doughnutChartLabelsDepresion: Label[] = [
    'Sin respuesta',
    'No hay depresión presente',
    'Depresión leve',
    'Depresión severa',
    'Depresión grave',
  ];
  public doughnutChartDataDepresion: MultiDataSet = [[0, 0, 0, 0, 0]];

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      if (this.patientService.getPatient() == null) {
        this.router.navigate(['/patients']).then();
      } else {
        this.patient = this.patientService.getPatient();
        this.loadDate();
      }
    }
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }

  loadDate() {
    this.loadingService.changeStateShowLoading(true);
    this.dateService.listDates('05-05-2021').subscribe(
      (data: any) => {
        this.loadingService.changeStateShowLoading(false);
        if (data.days) {
          this.startDate = data.days[0];
          this.endDate = data.days[6];
          this.loadDashboard();
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  loadDashboard() {
    this.loadingService.changeStateShowLoading(true);
    this.dashboardService
      .listDashboard(
        this.patient.userLoginDTO.dni,
        this.startDate,
        this.endDate
      )
      .subscribe(
        (data: any) => {
          if (data.dashboardDTO) {
            this.doughnutChartDataAnsiedad = [data.dashboardDTO.resultAnsiedad];
            this.doughnutChartDataDepresion = [
              data.dashboardDTO.resultDepresion,
            ];
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {}
}
