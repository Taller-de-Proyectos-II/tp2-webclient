import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.css'],
})
export class DialogPasswordComponent implements OnInit {
  passwordFormGroup: FormGroup;
  constructor(
    public matDialogRef: MatDialogRef<DialogPasswordComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

}
