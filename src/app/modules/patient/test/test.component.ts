import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { TestDTO } from 'src/app/core/models/testDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
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
  testsManifestacion: TestDTO[] = [];
  testsDepresion: TestDTO[] = [];
  testsAnsiedad: TestDTO[] = [];
  patient: PatientDTO = null;
  displayedColumns: string[] = ['id', 'question', 'score'];
  psychologist: PsychologistDTO = null;

  constructor(
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private matDialog: MatDialog,
    private testService: TestService,
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
        this.getTests();
      }
    }
  }

  getTests() {
    this.loadingService.changeStateShowLoading(true);
    this.testService
      .listTestsByTestType(this.patient.userLoginDTO.dni, 'Ansiedad')
      .subscribe((data: any) => {
        if (data.testsDTO) {
          this.testsAnsiedad = data.testsDTO;
        } else {
          this.testsAnsiedad = [];
        }
      });
    this.testService
      .listTestsByTestType(this.patient.userLoginDTO.dni, 'Depresión')
      .subscribe((data: any) => {
        if (data.testsDTO) {
          this.testsDepresion = data.testsDTO;
        } else {
          this.testsDepresion = [];
        }
      });
    this.testService
      .listTestsByTestType(this.patient.userLoginDTO.dni, 'Manifestaciones')
      .subscribe(
        (data: any) => {
          if (data.testsDTO) {
            this.testsManifestacion = data.testsDTO;
          } else {
            this.testsManifestacion = [];
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
                this.testsManifestacion = [];
                this.testsDepresion = [];
                this.testsAnsiedad = [];
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
