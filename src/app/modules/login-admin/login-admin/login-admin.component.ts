import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDTO } from 'src/app/core/models/userLoginDTO.model';
import { JWTService } from 'src/app/core/services/jwt.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private jwtService: JWTService
  ) {}

  ngOnInit(): void {
    this.loadloginFormGroup();
  }

  loadloginFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      password: '',
    });
  }

  login() {
    this.validate();
    if (this.loginFormGroup.valid) {
      var userLoginDTO: UserLoginDTO = {
        dni: '',
        password: this.loginFormGroup.get('password').value,
      };
      this.loadingService.changeStateShowLoading(true);
      this.loginService.loginAdmin(userLoginDTO).subscribe(
        (data: any) => {
          this.snackBarService.info(data.message);
          this.loadingService.changeStateShowLoading(false);
          if (data.status == 1) {
            this.jwtService.setToken(data.token);
            localStorage.setItem('admin', '1');
            this.redirectTo('/login-admin/welcome/');
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
      !this.loginFormGroup.get('password').value ||
      this.loginFormGroup.get('password').value == ''
    ) {
      this.loginFormGroup.get('password').setErrors({ required: true });
    }
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }
}
