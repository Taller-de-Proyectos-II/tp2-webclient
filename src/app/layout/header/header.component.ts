import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private psychologistService: PsychologistService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {}

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }

  cleanApp() {
    this.psychologistService.setExperience(null);
    this.patientService.setPatients(null);
  }

  closeApp() {
    localStorage.clear();
    window.location.reload();
  }
}
