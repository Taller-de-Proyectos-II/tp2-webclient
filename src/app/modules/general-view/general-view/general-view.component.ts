import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

import { PsychologistDTO } from '../../../core/models/psychologistDTO.model';
import { DashboardService } from '../../../core/services/dashboard.service';
import { LoadingService } from '../../../core/services/loading.service';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css'],
})
export class GeneralViewComponent implements OnInit {
  dashboardFormGroup: FormGroup;
  psychologist: PsychologistDTO;
  startDate = '';
  endDate = '';
  date = new Date();
  newDate = new Date();
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartDataAnsiedad: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartDataDepresion: MultiDataSet = [[0, 0, 0, 0]];
  public doughnutChartDataManifestaciones: MultiDataSet = [[0, 0]];
  public doughnutChartDataAlertas: MultiDataSet = [[0, 0]];

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
  public doughnutChartLabelsAlertas: Label[] = [
    'No necesita asignación de prueba',
    'Necesita asignación de prueba',
  ];
  public doughnutChartLabelsManifestaciones: Label[] = [
    'No presenta alerta',
    'Presenta alerta',
  ];

  constructor(
    private loadingService: LoadingService,
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardFormGroup();
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(
        localStorage.getItem('psychologist') || '{}'
      );
      this.loadDashboardFormGroup();
      this.loadDashboard();
    }
  }

  loadDashboardFormGroup() {
    this.dashboardFormGroup = this.formBuilder.group({
      startDate: new Date('01/01/2021'),
      endDate: this.date,
    });
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
      .listDashboardAllPatients(
        this.psychologist.userLoginDTO.dni,
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
            this.doughnutChartDataAlertas = [data.dashboardDTO.resultAlert];
            this.doughnutChartDataManifestaciones = [
              data.dashboardDTO.resultManifestacion,
            ];
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }
}
