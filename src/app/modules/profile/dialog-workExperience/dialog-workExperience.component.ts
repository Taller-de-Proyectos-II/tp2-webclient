import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WorkExperienceDTO } from 'src/app/core/models/workExperienceDTO.model';
import { WorkExperienceService } from 'src/app/core/services/workExperience.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-dialog-workExperience',
  templateUrl: './dialog-workExperience.component.html',
  styleUrls: ['./dialog-workExperience.component.css'],
})
export class DialogWorkExperienceComponent implements OnInit {
  workExperienceFormGroup: FormGroup;
  title: string = 'Título de prueba';
  button: string = 'Botón de prueba';
  myDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogWorkExperienceComponent>,
    private psychologistService: PsychologistService,
    private router: Router,
    private matDialog: MatDialog,
    private workExperienceService: WorkExperienceService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    }
    this.loadWorkExperienceFormGroup();
    if (this.data.action == 'create') {
      this.title = 'Agregar Experiencia Laboral';
      this.button = 'Agregar';
    } else {
      this.workExperienceFormGroup.patchValue(this.data.entity);
      var dateString = this.data.entity.startDate.replace('-', '/');
      dateString = dateString.replace('-', '/');
      var date = new Date(dateString);
      this.workExperienceFormGroup.get('startDate').patchValue(date);
      dateString = this.data.entity.endDate.replace('-', '/');
      dateString = dateString.replace('-', '/');
      date = new Date(dateString);
      this.workExperienceFormGroup.get('endDate').patchValue(date);
      this.title = 'Actualizar Experiencia Laboral';
      this.button = 'Actualizar';
    }
  }

  loadWorkExperienceFormGroup() {
    this.workExperienceFormGroup = this.formBuilder.group({
      place: '',
      occupation: '',
      startDate: this.myDate,
      endDate: this.myDate,
      description: '',
      workingDayType: '',
      current: false,
    });
  }

  save() {
    const cValue1 = formatDate(
      this.workExperienceFormGroup.get('startDate').value,
      'MM-dd-yyyy',
      'en-US'
    );
    const cValue2 = formatDate(
      this.workExperienceFormGroup.get('endDate').value,
      'MM-dd-yyyy',
      'en-US'
    );
    this.validate();
    if (this.workExperienceFormGroup.valid) {
      var workExperienceDTO: WorkExperienceDTO = {
        idWorkExperience: 0,
        place: this.workExperienceFormGroup.get('place').value,
        occupation: this.workExperienceFormGroup.get('occupation').value,
        description:
          this.workExperienceFormGroup.get('description').value == null
            ? ''
            : this.workExperienceFormGroup.get('description').value,
        psychologistDni: this.psychologistService.getPsychologist().userLoginDTO
          .dni,
        current:
          this.workExperienceFormGroup.get('endDate').value > this.myDate
            ? true
            : false,
        startDate: cValue1.toString(),
        endDate: cValue2.toString(),
        workingDayType: this.workExperienceFormGroup.get('workingDayType')
          .value,
      };
      if (this.data.action == 'create') {
        this.loadingService.changeStateShowLoading(true);
        this.workExperienceService.create(workExperienceDTO).subscribe(
          (data: any) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info(data.message);
            if (data.status == 1) {
              this.matDialogRef.close(true);
            }
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
      } else {
        workExperienceDTO.idWorkExperience = this.data.entity.idWorkExperience;
        this.loadingService.changeStateShowLoading(true);
        this.workExperienceService.update(workExperienceDTO).subscribe(
          (data: any) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info(data.message);
            if (data.status == 1) {
              this.matDialogRef.close(true);
            }
          },
          (error) => {
            this.loadingService.changeStateShowLoading(false);
            this.snackBarService.info('Error en el servidor');
          }
        );
      }
    }
  }

  cancel() {
    this.matDialogRef.close(false);
  }

  delete() {
    this.matDialog
      .open(DialogConfirmationComponent, {
        data: 'Se eliminarán la experiencia laboral',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.workExperienceService
            .delete(this.data.entity.idWorkExperience)
            .subscribe(
              (data: any) => {
                this.loadingService.changeStateShowLoading(false);
                this.snackBarService.info(data.message);
                if (data.status == 1) {
                  this.matDialogRef.close(true);
                }
              },
              (error) => {
                this.loadingService.changeStateShowLoading(false);
                this.snackBarService.info('Error en el servidor');
              }
            );
        }
      });
  }

  validate() {
    if (!this.workExperienceFormGroup.get('place').value) {
      this.workExperienceFormGroup.get('place').setErrors({ required: true });
    }
    if (!this.workExperienceFormGroup.get('occupation').value) {
      this.workExperienceFormGroup
        .get('occupation')
        .setErrors({ required: true });
    }
    if (!this.workExperienceFormGroup.get('workingDayType').value) {
      this.workExperienceFormGroup.get('workingDayType').setErrors({ required: true });
    }
  }
}
