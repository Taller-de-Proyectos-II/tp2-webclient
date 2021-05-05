import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DateService } from 'src/app/core/services/date.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  patient: PatientDTO = null;
  startDate = '';
  endDate = '';
  date = new Date();
  dashboardFormGroup: FormGroup;

  constructor(
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private dateService: DateService,
    private router: Router
  ) {}
  public doughnutChartType: ChartType = 'doughnut';
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  public doughnutChartLabelsAnsiedad: Label[] = [
    'No hay ansiedad presente',
    'Ansiedad leve',
    'Ansiedad severa',
    'Ansiedad grave',
  ];
  public doughnutChartDataAnsiedad: MultiDataSet = [[0, 0, 0, 0]];

  public doughnutChartLabelsDepresion: Label[] = [
    'No hay depresión presente',
    'Depresión leve',
    'Depresión severa',
    'Depresión grave',
  ];
  public doughnutChartDataDepresion: MultiDataSet = [[0, 0, 0, 0]];

  public lineChartDataAnsiedad: ChartDataSets[] = [
    { data: [], label: 'Ansiedad' },
  ];
  public lineChartDataDepresion: ChartDataSets[] = [
    { data: [], label: 'Depresión' },
  ];
  public lineChartLabelsAnsiedad: Label[] = [];
  public lineChartLabelsDepresion: Label[] = [];

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  ngOnInit(): void {
    this.loadDashboardFormGroup();
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

  loadDashboardFormGroup() {
    this.dashboardFormGroup = this.formBuilder.group({
      startDate: this.date,
      endDate: this.date,
    });
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }

  loadDate() {
    const dataAux = formatDate(this.date, 'MM-dd-yyyy', 'en-US');
    this.loadingService.changeStateShowLoading(true);
    this.dateService.listDates(dataAux).subscribe(
      (data: any) => {
        this.loadingService.changeStateShowLoading(false);
        if (data.days) {
          this.startDate = data.days[0];
          this.endDate = data.days[6];
          var endDateString = this.endDate.replace('-', '/');
          endDateString = endDateString.replace('-', '/');
          this.dashboardFormGroup
            .get('endDate')
            .patchValue(new Date(endDateString));
          var startDateString = this.startDate.replace('-', '/');
          startDateString = startDateString.replace('-', '/');
          this.dashboardFormGroup
            .get('startDate')
            .patchValue(new Date(startDateString));
          this.loadDashboard();
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  loadDashboard() {
    const startDateAux = formatDate(
      this.dashboardFormGroup.get('startDate').value,
      'MM-dd-yyyy',
      'en-US'
    );
    const endDateAux = formatDate(
      this.dashboardFormGroup.get('endDate').value,
      'MM-dd-yyyy',
      'en-US'
    );

    this.loadingService.changeStateShowLoading(true);
    this.dashboardService
      .listDashboard(
        this.patient.userLoginDTO.dni,
        startDateAux.toString(),
        endDateAux.toString()
      )
      .subscribe(
        (data: any) => {
          if (data.dashboardDTO) {
            this.doughnutChartDataAnsiedad = [data.dashboardDTO.resultAnsiedad];
            this.doughnutChartDataDepresion = [
              data.dashboardDTO.resultDepresion,
            ];
            var dataAux = [];
            var labelAux = [''];
            for (
              let i = 0;
              i < data.dashboardDTO.testDashboardAnsiedad.length;
              i++
            ) {
              if (i == 0)
                dataAux.push(data.dashboardDTO.testDashboardAnsiedad[i].score);
              dataAux.push(data.dashboardDTO.testDashboardAnsiedad[i].score);
              labelAux.push(
                data.dashboardDTO.testDashboardAnsiedad[i].endDate +
                  ' ' +
                  data.dashboardDTO.testDashboardAnsiedad[i].endHour
              );
            }
            data.dashboardDTO.testDashboardAnsiedad.forEach((element) => {
              dataAux.push(element.score);
              labelAux.push(element.endDate + ' ' + element.endHour);
            });

            this.lineChartDataAnsiedad = [{ data: dataAux, label: 'Ansiedad' }];
            this.lineChartLabelsAnsiedad = labelAux;
            dataAux = [];
            labelAux = [''];
            for (
              let i = 0;
              i < data.dashboardDTO.testDashboardDepresion.length;
              i++
            ) {
              if (i == 0)
                dataAux.push(data.dashboardDTO.testDashboardDepresion[i].score);
              dataAux.push(data.dashboardDTO.testDashboardDepresion[i].score);
              labelAux.push(
                data.dashboardDTO.testDashboardDepresion[i].endDate +
                  ' ' +
                  data.dashboardDTO.testDashboardDepresion[i].endHour
              );
            }
            this.lineChartDataDepresion = [
              { data: dataAux, label: 'Depresión' },
            ];
            this.lineChartLabelsDepresion = labelAux;
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
