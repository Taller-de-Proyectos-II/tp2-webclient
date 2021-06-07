import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  selected = 'Inicio';

  constructor(
    private router: Router,
    private psychologistService: PsychologistService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.selected = localStorage.getItem('header');
  }

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

  changeSelected(button) {
    localStorage.setItem('header', button);
    this.selected = button;
  }
}
