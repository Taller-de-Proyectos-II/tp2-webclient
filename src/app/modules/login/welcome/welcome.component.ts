import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PsychologistService } from 'src/app/core/services/psychologist.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  names: String = 'compañer@'
  constructor(
    private router: Router,
    private psychologistService: PsychologistService
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      this.names = this.psychologistService.getPsychologist().names;
    }
  }
}
