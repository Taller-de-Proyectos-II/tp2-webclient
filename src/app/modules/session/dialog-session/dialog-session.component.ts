import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SessionService } from 'src/app/core/services/session.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dialog-session',
  templateUrl: './dialog-session.component.html',
  styleUrls: ['./dialog-session.component.css'],
})
export class DialogSessionComponent implements OnInit {
  sessionFormGroup: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<DialogSessionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadSessionFormGroup();
  }

  cancel() {
    this.matDialogRef.close();
  }

  loadSessionFormGroup() {
    this.sessionFormGroup = this.formBuilder.group({
      meetingLink: '',
    });
  }

  validate() {
    if (!this.sessionFormGroup.get('meetingLink').value) {
      this.sessionFormGroup.get('meetingLink').setErrors({ required: true });
    }
  }

  save() {
    this.validate();
    if (this.sessionFormGroup.valid) {
      var sessionDTO = {
        idSession: this.data,
        meetingLink: this.sessionFormGroup.get('meetingLink').value,
      };
      this.loadingService.changeStateShowLoading(true);
      this.sessionService.updateAcepted(sessionDTO).subscribe(
        (data: any) => {
          this.loadingService.changeStateShowLoading(false);
          if (data.status == 1) {
            this.matDialogRef.close(true);
          } else {
            this.snackBarService.info(data.mesage);
          }
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
        }
      );
    }
  }
}
