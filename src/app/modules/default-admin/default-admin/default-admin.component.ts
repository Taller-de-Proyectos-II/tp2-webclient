import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DefaultAdminService } from 'src/app/core/services/default-admin.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-default-admin',
  templateUrl: './default-admin.component.html',
  styleUrls: ['./default-admin.component.css'],
})
export class DefaultAdminComponent implements OnInit {
  constructor(
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private defaultAdminService: DefaultAdminService
  ) {}

  ngOnInit(): void {}

  createQuestionTypes() {
    this.loadingService.changeStateShowLoading(true);
    this.defaultAdminService.createQuestionTypes().subscribe(
      (data: any) => {
        if (data) {
          this.snackBarService.info(data.message);
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  createQuestions() {
    this.loadingService.changeStateShowLoading(true);
    this.defaultAdminService.createQuestions().subscribe(
      (data: any) => {
        if (data) {
          this.snackBarService.info(data.message);
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  createSymptoms() {
    this.loadingService.changeStateShowLoading(true);
    this.defaultAdminService.createSymptoms().subscribe(
      (data: any) => {
        if (data) {
          this.snackBarService.info(data.message);
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  createSchedules() {
    this.loadingService.changeStateShowLoading(true);
    this.defaultAdminService.createSchedules().subscribe(
      (data: any) => {
        if (data) {
          this.snackBarService.info(data.message);
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }
}
