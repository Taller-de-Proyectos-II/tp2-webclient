import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManifestationDTO } from 'src/app/core/models/manifestationDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { TestDTO } from 'src/app/core/models/testDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ManifestationService } from 'src/app/core/services/manifestation.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TestService } from 'src/app/core/services/test.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

import { DialogTestComponent } from '../dialog-test/dialog-test.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  physicalManifestation: ManifestationDTO = null;
  emotionalManifestation: ManifestationDTO = null;
  conductualManifestation: ManifestationDTO = null;
  cognitiveManifestation: ManifestationDTO = null;

  tests: TestDTO[] = [];
  patient: PatientDTO = null;
  displayedColumns: string[] = ['id', 'question', 'score'];

  constructor(
    private formBuilder: FormBuilder,
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog,
    private manifestationService: ManifestationService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      if (this.patientService.getPatient() == null) {
        this.router.navigate(['/patients']).then();
      } else {
        this.patient = this.patientService.getPatient();
        this.getTests();
      }
    }
  }

  getTests() {
    this.loadingService.changeStateShowLoading(true);
    this.testService.listTests(this.patient.userLoginDTO.dni).subscribe(
      (data: any) => {
        if (data.testsDTO) {
          this.tests = data.testsDTO;
        } else {
          this.tests = [];
        }
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  changeCheckedToFalse(manifestation) {
    manifestation.symptoms.forEach((symptom) => {
      symptom.checked = false;
    });
  }

  createTest() {
    this.matDialog
      .open(DialogTestComponent, {
        data: this.patient.userLoginDTO.dni,
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.getTests();
        }
      });
  }

  deleteTest(idTest: number) {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se eliminará la prueba seleccionada',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.testService.deleteTest(idTest).subscribe(
            (data: any) => {
              this.snackBarService.info(data.message);
              this.loadingService.changeStateShowLoading(false);
              if (data.status == 1) {
                this.tests = [];
                this.getTests();
              }
            },
            (error) => {
              this.loadingService.changeStateShowLoading(false);
            }
          );
        }
      });
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }
}
