import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDTO } from 'src/app/core/models/alertDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: AlertDTO[] = [];
  patient: PatientDTO = null;
  displayedColumns: string[] = ['id', 'question', 'score'];

  constructor(
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
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
    this.alertService.listImportantAlerts(this.patient.userLoginDTO.dni).subscribe(
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
