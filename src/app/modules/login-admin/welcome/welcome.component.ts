import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('admin')) {
      this.router.navigate(['/']).then();
    }
  }

}
