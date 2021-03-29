import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PsychologistService } from 'src/app/core/services/psychologistService.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { PsychologistDTO } from '../../../core/models/psychologistDTO.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  myDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private psychologistService: PsychologistService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadRegisterFormGroup();
  }

  loadRegisterFormGroup() {
    this.registerFormGroup = this.formBuilder.group({
      dni: '',
      password: '',
      confirmPassword: '',
      names: '',
      lastNames: '',
      birthday: this.myDate,
      cpsp: '',
      email: '',
      phone: '',
    });
  }

  register() {
    const cValue = formatDate(
      this.registerFormGroup.get('birthday').value,
      'MM-dd-yyyy',
      'en-US'
    );
    this.validate();
    if (this.registerFormGroup.valid) {
      var psychologistDTO: PsychologistDTO = {
        userLoginDTO: {
          dni: this.registerFormGroup.get('dni').value,
          password: this.registerFormGroup.get('password').value,
        },
        names: this.registerFormGroup.get('names').value,
        lastNames: this.registerFormGroup.get('lastNames').value,
        birthday: cValue.toString(),
        cpsp: this.registerFormGroup.get('cpsp').value,
        phone: this.registerFormGroup.get('phone').value,
        email: this.registerFormGroup.get('email').value,
        description: '',
      };

      this.psychologistService
        .register(psychologistDTO)
        .subscribe((data: any) => {
          this.snackBarService.info(data.message);
          if (data.status == 1) this.router.navigate(['/']).then();
        });
    }
  }

  validate() {
    this.registerFormGroup.markAsTouched();
    if (
      !this.registerFormGroup.get('dni').value ||
      this.registerFormGroup.get('dni').value == ''
    ) {
      this.registerFormGroup.get('dni').setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('password').value ||
      this.registerFormGroup.get('password').value == ''
    ) {
      this.registerFormGroup.get('password').setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('confirmPassword').value ||
      this.registerFormGroup.get('confirmPassword').value == ''
    ) {
      this.registerFormGroup
        .get('confirmPassword')
        .setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('names').value ||
      this.registerFormGroup.get('names').value == ''
    ) {
      this.registerFormGroup.get('names').setErrors({ required: true });
    }

    if (
      !this.registerFormGroup.get('lastNames').value ||
      this.registerFormGroup.get('lastNames').value == ''
    ) {
      this.registerFormGroup.get('lastNames').setErrors({ required: true });
    }

    if (
      !this.registerFormGroup.get('birthday').value ||
      this.registerFormGroup.get('birthday').value == ''
    ) {
      this.registerFormGroup.get('birthday').setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('cpsp').value ||
      this.registerFormGroup.get('cpsp').value == ''
    ) {
      this.registerFormGroup.get('cpsp').setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('email').value ||
      this.registerFormGroup.get('email').value == ''
    ) {
      this.registerFormGroup.get('email').setErrors({ required: true });
    }
    if (
      !this.registerFormGroup.get('phone').value ||
      this.registerFormGroup.get('phone').value == ''
    ) {
      this.registerFormGroup.get('phone').setErrors({ required: true });
    }
    if (
      this.registerFormGroup.get('password').valid == true &&
      this.registerFormGroup.get('confirmPassword').valid == true &&
      this.registerFormGroup.get('confirmPassword').value !=
        this.registerFormGroup.get('password').value
    ) {
      this.registerFormGroup
        .get('confirmPassword')
        .setErrors({ incorrect: true });
    }
  }
}
