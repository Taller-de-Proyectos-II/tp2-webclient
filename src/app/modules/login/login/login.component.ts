import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologistService.service';

import { UserLoginDTO } from '../../../core/models/userLoginDTO.model';
import { LoginService } from '../../../core/services/login.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';

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
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadLoginFromGroup();
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
                  this.psychologistService.setPsychologist(psychologist);
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
}
