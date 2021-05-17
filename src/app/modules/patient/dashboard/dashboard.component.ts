import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';

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
  labelsManifestations: String[];
  labelsAlerts: String[];
  psychologist: PsychologistDTO = null;

  displayedColumnsManifestations = ['id', 'question'];

  constructor(
    private loadingService: LoadingService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {}
  public doughnutChartType: ChartType = 'doughnut';
  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';

  public lineChartLegend = true;
  public barChartLegend = true;

  public doughnutChartLabelsAnsiedad: Label[] = [
    'No hay ansiedad presente',
    'Ansiedad leve',
    'Ansiedad severa',
    'Ansiedad grave',
  ];
  public doughnutChartLabelsDepresion: Label[] = [
    'No hay depresión presente',
    'Depresión leve',
    'Depresión severa',
    'Depresión grave',
  ];
  public barChartLabelsManifestaciones: Label[] = [];
  public barChartLabelsAlertas: Label[] = [];
  public doughnutChartLabelsManifestaciones: Label[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
  ];
  public doughnutChartLabelsAlertas: Label[] = [
    'Pregunta 1',
    'Pregunta 2',
    'Pregunta 3',
    'Pregunta 4',
    'Pregunta 5',
    'Pregunta 6',
  ];

  public doughnutChartDataAnsiedad: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartDataDepresion: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartDataManifestaciones: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartDataAlertas: MultiDataSet = [[0, 0, 0, 0, 0, 0]];

  public lineChartDataAnsiedad: ChartDataSets[] = [
    { data: [], label: 'Ansiedad' },
  ];
  public lineChartDataDepresion: ChartDataSets[] = [
    { data: [], label: 'Depresión' },
  ];
  public barChartDataManifestaciones: ChartDataSets[] = [
    { data: [], label: 'Manifestaciones' },
  ];
  public barChartDataAlertas: ChartDataSets[] = [
    { data: [], label: 'Alertas' },
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
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  ngOnInit(): void {
    this.loadDashboardFormGroup();
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
      if (this.patientService.getPatient() == null) {
        this.router.navigate(['/patients']).then();
      } else {
        this.patient = this.patientService.getPatient();
        this.loadDashboard();
        this.loadAlerts();
        this.loadManifestation();
      }
    }
  }

  loadDashboardFormGroup() {
    this.dashboardFormGroup = this.formBuilder.group({
      startDate: new Date('01/01/2021'),
      endDate: this.date,
    });
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
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

  loadManifestation() {
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
    this.dashboardService
      .listManifestations(
        this.patient.userLoginDTO.dni,
        startDateAux.toString(),
        endDateAux.toString()
      )
      .subscribe((data: any) => {
        if (data.optionDashboardDTO) {
          var dataAux = [];
          dataAux.push(0);
          data.optionDashboardDTO.result.forEach((element) => {
            dataAux.push(element);
          });
          dataAux.push(0);
          this.barChartDataManifestaciones = [
            { data: dataAux, label: 'Manifestaciones' },
          ];
          this.doughnutChartDataManifestaciones = [
            data.optionDashboardDTO.result,
          ];
          this.barChartLabelsManifestaciones = [
            '',
            'Pregunta 1',
            'Pregunta 2',
            'Pregunta 3',
            'Pregunta 4',
            '',
          ];
          this.labelsManifestations = data.optionDashboardDTO.resultString;
        }
      });
  }

  loadAlerts() {
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
    this.dashboardService
      .listAlerts(
        this.patient.userLoginDTO.dni,
        startDateAux.toString(),
        endDateAux.toString()
      )
      .subscribe((data: any) => {
        if (data.optionDashboardDTO) {
          var dataAux = [];
          dataAux.push(0);
          data.optionDashboardDTO.result.forEach((element) => {
            dataAux.push(element);
          });
          dataAux.push(0);
          this.barChartDataAlertas = [{ data: dataAux, label: 'Alertas' }];
          this.doughnutChartDataAlertas = [data.optionDashboardDTO.result];
          this.barChartLabelsAlertas = [
            '',
            'Pregunta 1',
            'Pregunta 2',
            'Pregunta 3',
            'Pregunta 4',
            'Pregunta 5',
            'Pregunta 6',
            '',
          ];
          this.labelsAlerts = data.optionDashboardDTO.resultString;
        }
      });
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {}
}
