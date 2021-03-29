import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  toogleSuscription: Subscription;
  toggleMenu: boolean = false;

  showLoadingSuscription: Subscription;
  showLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.showLoadingSuscription = this.loadingService.subscribe(
      (showLoading) => {
        setTimeout(() => {
          this.showLoading = showLoading;
        });
      }
    );
  }

  ngOnDestroy() {
    this.showLoadingSuscription.unsubscribe();
    this.toogleSuscription.unsubscribe();
  }

}
