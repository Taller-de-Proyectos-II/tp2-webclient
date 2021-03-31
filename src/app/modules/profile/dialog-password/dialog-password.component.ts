import { formatDate } from '@angular/common';
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
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    }
    this.loadPasswordFormGroup();
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
    const cValue = formatDate(this.data.birthday, 'MM-dd-yyyy', 'en-US');
    this.validate();
    if (this.passwordFormGroup.valid) {
      var psychologist: PsychologistDTO = {
        userLoginDTO: {
          dni: this.psychologistService.getPsychologist().userLoginDTO.dni,
          password:
            this.passwordFormGroup.get('confirmPassword').value == ''
              ? this.psychologistService.getPsychologist().userLoginDTO.password
              : this.passwordFormGroup.get('newPassword').value,
        },
        names: this.data.names,
        lastNames: this.data.lastNames,
        birthday: cValue.toString(),
        phone: this.data.phone,
        email: this.data.email,
        cpsp: this.data.cpsp,
        description: this.data.description,
      };

      this.loadingService.changeStateShowLoading(true);
      this.psychologistService.update(psychologist).subscribe((data: any) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info(data.message);
        if (data.status == 1) {
          this.psychologistService.setPsychologist(psychologist);
          this.matDialogRef.close();
          this.router.navigate(['/myprofile/']).then();
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
        this.psychologistService.getPsychologist().userLoginDTO.password
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
