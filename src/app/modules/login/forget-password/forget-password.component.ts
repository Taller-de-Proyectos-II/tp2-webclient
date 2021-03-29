import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router,
    private loginService: LoginService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadForgetPasswordFormGroup();
  }

  loadForgetPasswordFormGroup() {
    this.forgetPasswordFormGroup = this.formBuilder.group({
      email: '',
    });
  }

  sendEmail() {
    this.validate();
    if (this.forgetPasswordFormGroup.valid) {
      var emailDTO = {
        email: this.forgetPasswordFormGroup.get('email').value,
      };
      this.loadingService.changeStateShowLoading(true);
      this.loginService.restorePasswordPsychologist(emailDTO).subscribe(
        (data: any) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info(data.message);
          if (data.status == 1) this.router.navigate(['/']).then();
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
    }
  }

  validate() {
    this.forgetPasswordFormGroup.markAsTouched();
    if (
      !this.forgetPasswordFormGroup.get('email').value ||
      this.forgetPasswordFormGroup.get('email').value == ''
    ) {
      this.forgetPasswordFormGroup.get('email').setErrors({ required: true });
    }
  }

  redirectTo(url: string) {
    this.router.navigate([url]).then();
  }
}
