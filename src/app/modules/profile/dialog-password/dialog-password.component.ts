import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.css'],
})
export class DialogPasswordComponent implements OnInit {
  passwordFormGroup: FormGroup;
  psychologist: PsychologistDTO = null;

  constructor(
    public matDialogRef: MatDialogRef<DialogPasswordComponent>,
    private formBuilder: FormBuilder,
    private psychologistService: PsychologistService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('psychologist')) {
      this.router.navigate(['/']).then();
    } else {
      this.loadPasswordFormGroup();
    }
  }

  loadPasswordFormGroup() {
    this.passwordFormGroup = this.formBuilder.group({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
  }

  cancel() {
    this.matDialogRef.close();
  }

  save() {
    this.validate();
    if (this.passwordFormGroup.valid) {
      var changePasswordDTO = {
        dni: this.psychologist.userLoginDTO.dni,
        password: this.psychologist.userLoginDTO.password,
        newPassword: this.passwordFormGroup.get('newPassword').value,
      };

      this.loadingService.changeStateShowLoading(true);
      this.psychologistService
        .updatePassword(changePasswordDTO)
        .subscribe((data: any) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info(data.message);
          if (data.status == 1) {
            var psychologist = this.psychologist;
            psychologist.userLoginDTO.password =
              this.passwordFormGroup.get('newPassword').value;
            localStorage.setItem('psychologist', JSON.stringify(psychologist));
            this.matDialogRef.close();
          }
        });
    }
  }

  validate() {
    if (!this.passwordFormGroup.get('password').value) {
      this.passwordFormGroup.get('password').setErrors({ required: true });
    } else {
      if (
        this.passwordFormGroup.get('password').value !=
        this.psychologist.userLoginDTO.password
      ) {
        this.passwordFormGroup.get('password').setErrors({ incorrect: true });
      }
    }
    if (
      !this.passwordFormGroup.get('newPassword').value &&
      this.passwordFormGroup.get('confirmPassword').value
    ) {
      this.passwordFormGroup.get('newPassword').setErrors({ required: true });
    } else if (
      this.passwordFormGroup.get('newPassword').value &&
      !this.passwordFormGroup.get('confirmPassword').value
    ) {
      this.passwordFormGroup
        .get('confirmPassword')
        .setErrors({ required: true });
    } else if (
      this.passwordFormGroup.get('newPassword').value != '' &&
      this.passwordFormGroup.get('confirmPassword').value != '' &&
      this.passwordFormGroup.get('newPassword').value !=
        this.passwordFormGroup.get('confirmPassword').value
    ) {
      this.passwordFormGroup
        .get('confirmPassword')
        .setErrors({ incorrect: true });
    }
  }
}
