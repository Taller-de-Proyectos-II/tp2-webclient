import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PsychologistService } from 'src/app/core/services/psychologistService.service';
import { DialogPasswordComponent } from '../dialog-password/dialog-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  psychologistFormGroup: FormGroup;
  myDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private psychologistService: PsychologistService,
    private datePipe: DatePipe,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPsychologistFormGroup();
    this.loadFromService();
  }

  loadFromService() {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      this.psychologistFormGroup
        .get('names')
        .patchValue(this.psychologistService.getPsychologist().names);
      this.psychologistFormGroup
        .get('lastNames')
        .patchValue(this.psychologistService.getPsychologist().lastNames);
      this.psychologistFormGroup
        .get('cpsp')
        .patchValue(this.psychologistService.getPsychologist().cpsp);
      this.psychologistFormGroup
        .get('email')
        .patchValue(this.psychologistService.getPsychologist().email);
      this.psychologistFormGroup
        .get('phone')
        .patchValue(this.psychologistService.getPsychologist().phone);
      this.psychologistFormGroup
        .get('description')
        .patchValue(this.psychologistService.getPsychologist().description);
      var dateString = this.psychologistService
        .getPsychologist()
        .birthday.replace('-', '/');
      dateString = dateString.replace('-', '/');
      var date = new Date(dateString);
      this.psychologistFormGroup.get('birthday').patchValue(date);
    }
  }

  loadPsychologistFormGroup() {
    this.psychologistFormGroup = this.formBuilder.group({
      names: '',
      lastNames: '',
      birthday: [this.myDate],
      cpsp: '',
      email: '',
      phone: '',
      description: '',
    });
  }

  openPasswordDialog() {
    this.matDialog.open(DialogPasswordComponent, {
      disableClose: true,
    });
  }
}
