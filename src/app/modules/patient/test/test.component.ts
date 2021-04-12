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
        this.getManifestations();
      }
    }
  }

  getTests() {
    this.loadingService.changeStateShowLoading(true);
    this.testService.listTests(this.patient.userLoginDTO.dni).subscribe(
      (data: any) => {
        if (data.testsDTO) {
          this.tests = data.testsDTO;
          this.tests.forEach((test) => {
            var physicalSymptoms = [];
            var emotionalSymptoms = [];
            var conductualSymptomses = [];
            var cognitiveSymptoms = [];

            this.physicalManifestation.symptoms.forEach((symptom) => {
              var symptomManifestation = symptom;
              var symptomAux = test.symptoms.find(
                (symptomTest) => symptomTest.idSymptom == symptom.idSymptom
              );
              if (symptomAux) {
                symptomManifestation = {
                  idSymptom: symptom.idSymptom,
                  idManifestation: symptom.idManifestation,
                  name: symptom.name,
                  description: symptom.description,
                  checked: true,
                };
              }
              physicalSymptoms.push(symptomManifestation);
            });
            this.emotionalManifestation.symptoms.forEach((symptom) => {
              var symptomManifestation = symptom;
              var symptomAux = test.symptoms.find(
                (symptomTest) => symptomTest.idSymptom == symptom.idSymptom
              );
              if (symptomAux) {
                symptomManifestation = {
                  idSymptom: symptom.idSymptom,
                  idManifestation: symptom.idManifestation,
                  name: symptom.name,
                  description: symptom.description,
                  checked: true,
                };
              }
              emotionalSymptoms.push(symptomManifestation);
            });
            this.conductualManifestation.symptoms.forEach((symptom) => {
              var symptomManifestation = symptom;
              var symptomAux = test.symptoms.find(
                (symptomTest) => symptomTest.idSymptom == symptom.idSymptom
              );
              if (symptomAux) {
                symptomManifestation = {
                  idSymptom: symptom.idSymptom,
                  idManifestation: symptom.idManifestation,
                  name: symptom.name,
                  description: symptom.description,
                  checked: true,
                };
              }
              conductualSymptomses.push(symptomManifestation);
            });
            this.cognitiveManifestation.symptoms.forEach((symptom) => {
              var symptomManifestation = symptom;
              var symptomAux = test.symptoms.find(
                (symptomTest) => symptomTest.idSymptom == symptom.idSymptom
              );
              if (symptomAux) {
                symptomManifestation = {
                  idSymptom: symptom.idSymptom,
                  idManifestation: symptom.idManifestation,
                  name: symptom.name,
                  description: symptom.description,
                  checked: true,
                };
              }
              cognitiveSymptoms.push(symptomManifestation);
            });

            test.physicalManifestation = {
              idManifestation: this.physicalManifestation.idManifestation,
              name: this.physicalManifestation.name,
              description: this.physicalManifestation.description,
              symptoms: physicalSymptoms,
            };
            test.emotionalManifestation = {
              idManifestation: this.emotionalManifestation.idManifestation,
              name: this.emotionalManifestation.name,
              description: this.emotionalManifestation.description,
              symptoms: emotionalSymptoms,
            };
            test.conductualManifestation = {
              idManifestation: this.conductualManifestation.idManifestation,
              name: this.conductualManifestation.name,
              description: this.conductualManifestation.description,
              symptoms: conductualSymptomses,
            };
            test.cognitiveManifestation = {
              idManifestation: this.cognitiveManifestation.idManifestation,
              name: this.cognitiveManifestation.name,
              description: this.cognitiveManifestation.description,
              symptoms: cognitiveSymptoms,
            };
          });
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

  getManifestations() {
    this.loadingService.changeStateShowLoading(true);
    this.manifestationService.listAll().subscribe(
      (data: any) => {
        if (data.manifestationsDTO) {
          this.physicalManifestation = data.manifestationsDTO.physical;
          this.emotionalManifestation = data.manifestationsDTO.emotional;
          this.conductualManifestation = data.manifestationsDTO.conductual;
          this.cognitiveManifestation = data.manifestationsDTO.cognitive;
          this.changeCheckedToFalse(this.physicalManifestation);
          this.changeCheckedToFalse(this.emotionalManifestation);
          this.changeCheckedToFalse(this.conductualManifestation);
          this.changeCheckedToFalse(this.cognitiveManifestation);
          this.loadingService.changeStateShowLoading(false);
          this.getTests();
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  createTest() {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se asignará una nueva prueba al paciente',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.testService.createTest(this.patient.userLoginDTO.dni).subscribe(
            (data: any) => {
              this.snackBarService.info(data.message);
              this.loadingService.changeStateShowLoading(false);
              if (data.status == 1) {
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

  deleteTest(idTest) {
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
