import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDTO } from 'src/app/core/models/alertDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alerts: AlertDTO[] = [];
  patient: PatientDTO = null;
  displayedColumns: string[] = ['id', 'question', 'score'];
  psychologist: PsychologistDTO = null;

  constructor(
    private loadingService: LoadingService,
    private patientService: PatientService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
      if (this.patientService.getPatient() == null) {
        this.router.navigate(['/patients']).then();
      } else {
        this.patient = this.patientService.getPatient();
        this.getAlerts();
      }
    }
  }

  getAlerts() {
    this.loadingService.changeStateShowLoading(true);
    this.alertService.listAlerts(this.patient.userLoginDTO.dni).subscribe(
      (data: any) => {
        if (data.alertsDTO) {
          this.alerts = data.alertsDTO;
        } else {
          this.alerts = [];
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
}
