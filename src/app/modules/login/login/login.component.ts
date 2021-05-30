import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { JWTService } from 'src/app/core/services/jwt.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';

import { UserLoginDTO } from '../../../core/models/userLoginDTO.model';
import { LoginService } from '../../../core/services/login.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { DialogCovidComponent } from '../dialog-covid/dialog-covid.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: SnackBarService,
    private psychologistService: PsychologistService,
    private loadingService: LoadingService,
    private patientService: PatientService,
    private matDialog: MatDialog,
    private jwtService: JWTService
  ) {}

  ngOnInit(): void {
    this.closeApp();
    this.cleanApp();
    this.loadLoginFromGroup();
    localStorage.setItem('header', 'Inicio');
    this.openCovidDialog();
  }

  loadLoginFromGroup() {
    this.loginFormGroup = this.formBuilder.group({
      dni: [''],
      password: [''],
    });
  }

  login() {
    this.validate();
    if (this.loginFormGroup.valid) {
      var userLoginDTO: UserLoginDTO = {
        dni: this.loginFormGroup.get('dni').value,
        password: this.loginFormGroup.get('password').value,
      };
      this.loadingService.changeStateShowLoading(true);
      this.loginService.login(userLoginDTO).subscribe(
        (data: any) => {
          this.snackBarService.info(data.message);
          this.loadingService.changeStateShowLoading(false);
          if (data.status == 1) {
            this.jwtService.setToken(data.token);
            this.loadingService.changeStateShowLoading(true);
            this.psychologistService.listByDni(userLoginDTO.dni).subscribe(
              (data2: any) => {
                if (data2.psychologistDTO) {
                  var psychologist: PsychologistDTO = {
                    userLoginDTO: {
                      dni: userLoginDTO.dni,
                      password: userLoginDTO.password,
                    },
                    names: data2.psychologistDTO.names,
                    lastNames: data2.psychologistDTO.lastNames,
                    birthday: data2.psychologistDTO.birthday,
                    cpsp: data2.psychologistDTO.cpsp,
                    description: data2.psychologistDTO.description,
                    email: data2.psychologistDTO.email,
                    phone: data2.psychologistDTO.phone,
                  };
                  localStorage.setItem(
                    'psychologist',
                    JSON.stringify(psychologist)
                  );
                  this.loadingService.changeStateShowLoading(false);
                  this.router.navigate(['/welcome/']).then();
                }
                this.loadingService.changeStateShowLoading(false);
              },
              (error) => {
                this.loadingService.changeStateShowLoading(false);
                this.snackBarService.info('Error en el servidor');
              }
            );
          }
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
    }
  }

  validate() {
    this.loginFormGroup.markAsTouched();
    if (
      !this.loginFormGroup.get('dni').value ||
      this.loginFormGroup.get('dni').value == ''
    ) {
      this.loginFormGroup.get('dni').setErrors({ required: true });
    }
    if (
      !this.loginFormGroup.get('password').value ||
      this.loginFormGroup.get('password').value == ''
    ) {
      this.loginFormGroup.get('password').setErrors({ required: true });
    }
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
  }

  openCovidDialog() {
    this.matDialog.open(DialogCovidComponent, {
      disableClose: false,
    });
  }
}
