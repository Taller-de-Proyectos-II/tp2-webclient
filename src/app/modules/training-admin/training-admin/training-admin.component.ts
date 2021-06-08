import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertDTO } from 'src/app/core/models/alertDTO.model';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { TestDTO } from 'src/app/core/models/testDTO.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { TrainingService } from 'src/app/core/services/training.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { TestService } from 'src/app/core/services/test.service';

@Component({
  selector: 'app-training-admin',
  templateUrl: './training-admin.component.html',
  styleUrls: ['./training-admin.component.css'],
})
export class TrainingAdminComponent implements OnInit {
  dniFormGroup: FormGroup;
  patients: PatientDTO[] = [];
  patientFound: PatientDTO = null;
  searchPatient: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private snackBarService: SnackBarService,
    private router: Router,
    private alertService: AlertService,
    private testService: TestService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.loadDniFormGroup();
    if (!localStorage.getItem('admin')) {
      this.router.navigate(['/']).then();
    } else {
      if (this.patientService.getPatients() == null) {
        this.setInService();
      } else this.patients = this.patientService.getPatients();
    }
  }

  loadDniFormGroup() {
    this.dniFormGroup = this.formBuilder.group({
      dni: '',
    });
  }

  searchPatientByDni() {
    this.loadingService.changeStateShowLoading(true);
    this.validate();
    if (this.dniFormGroup.valid) {
      this.patientService
        .findByDni(this.dniFormGroup.get('dni').value)
        .subscribe(
          (data: any) => {
            this.searchPatient = true;
            if (data.patientDTO) {
              this.patientFound = data.patientDTO;
            } else this.patientFound = null;
            this.loadingService.changeStateShowLoading(false);
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
    }
  }

  validate() {
    if (!this.dniFormGroup.get('dni').value) {
      this.dniFormGroup.get('dni').setErrors({ required: true });
    }
  }

  setInService() {
    this.loadingService.changeStateShowLoading(true);
    this.patientService.listAll().subscribe(
      (data: any) => {
        if (data.patientsDTO) {
          this.patientService.setPatients(data.patientsDTO);
        } else {
          this.patientService.setPatients([]);
        }
        this.patients = this.patientService.getPatients();
        this.loadingService.changeStateShowLoading(false);
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  trainingAlerts(dni) {
    var inputs = [];
    var outputs = [];
    this.loadingService.changeStateShowLoading(true);
    this.alertService.listAlerts(dni).subscribe(
      (data: any) => {
        if (data.alertsDTO) {
          var alertas: AlertDTO[] = data.alertsDTO;
          alertas.forEach((alert) => {
            if (alert.important == true) outputs.push([1]);
            else outputs.push([0]);
            var individualInput = [];
            alert.alertAnswersDTO.forEach((alertAnswer) => {
              individualInput.push(alertAnswer.score);
            });
            inputs.push(individualInput);
          });
        }
        if (inputs.length == 0) {
          this.snackBarService.info('No hay datos para realizar entrenamiento');
          this.loadingService.changeStateShowLoading(false);
        }
        else {
          var trainingDTO = {
            json: JSON.stringify({ inputs, outputs })
          };
          this.trainingService.trainingAlerts(trainingDTO).subscribe(
            (data: any) => {
              this.snackBarService.info(data.message);
              this.loadingService.changeStateShowLoading(false);
            },
            (error) => {
              this.snackBarService.info('Ocurrió un error en el servidor');
              this.loadingService.changeStateShowLoading(false);
            }
          );
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }

  trainingManifestations(dni) {
    var inputs = [];
    var outputs = [];
    this.loadingService.changeStateShowLoading(true);
    this.testService.listTestsByTestType(dni, 'Manifestaciones').subscribe(
      (data: any) => {
        if (data.testsDTO) {
          var tests: TestDTO[] = data.testsDTO;
          tests.forEach((test) => {
            if (test.diagnostic == 'Necesita asignación de prueba')
              outputs.push([1]);
            else outputs.push([0]);
            var individualInput = [];
            test.answersDTO.forEach((answer) => {
              individualInput.push(answer.score);
            });
            inputs.push(individualInput);
          });
        }
        if (inputs.length == 0) {
          this.snackBarService.info('No hay datos para realizar entrenamiento');
          this.loadingService.changeStateShowLoading(false);
        }
        else {
          var trainingDTO = {
            json: JSON.stringify({ inputs, outputs })
          };
          this.trainingService
            .trainingManifestations(trainingDTO)
            .subscribe(
              (data: any) => {
                this.snackBarService.info(data.message);
                this.loadingService.changeStateShowLoading(false);
              },
              (error) => {
                this.snackBarService.info('Ocurrió un error en el servidor');
                this.loadingService.changeStateShowLoading(false);
              }
            );
        }
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
      }
    );
  }
}
