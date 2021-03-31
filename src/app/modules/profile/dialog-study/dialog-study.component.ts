import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatEndDate } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudyDTO } from 'src/app/core/models/studyDTO.model';
import { StudyService } from 'src/app/core/services/study.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-dialog-study',
  templateUrl: './dialog-study.component.html',
  styleUrls: ['./dialog-study.component.css'],
})
export class DialogStudyComponent implements OnInit {
  studyFormGroup: FormGroup;
  title: string = 'Título de prueba';
  button: string = 'Botón de prueba';
  myDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogStudyComponent>,
    private psychologistService: PsychologistService,
    private router: Router,
    private matDialog: MatDialog,
    private studyService: StudyService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    }
    this.loadStudyFormGroup();
    if (this.data.action == 'create') {
      this.title = 'Agregar Estudios';
      this.button = 'Agregar';
    } else {
      this.studyFormGroup.patchValue(this.data.entity);
      var dateString = this.data.entity.startDate.replace('-', '/');
      dateString = dateString.replace('-', '/');
      var date = new Date(dateString);
      this.studyFormGroup.get('startDate').patchValue(date);
      dateString = this.data.entity.endDate.replace('-', '/');
      dateString = dateString.replace('-', '/');
      date = new Date(dateString);
      this.studyFormGroup.get('endDate').patchValue(date);
      this.title = 'Actualizar Estudios';
      this.button = 'Actualizar';
    }
  }

  loadStudyFormGroup() {
    this.studyFormGroup = this.formBuilder.group({
      academicDiscipline: '',
      title: '',
      startDate: this.myDate,
      endDate: this.myDate,
      description: '',
      studyCenter: '',
      complete: false,
    });
  }

  save() {
    const cValue1 = formatDate(
      this.studyFormGroup.get('startDate').value,
      'MM-dd-yyyy',
      'en-US'
    );
    const cValue2 = formatDate(
      this.studyFormGroup.get('endDate').value,
      'MM-dd-yyyy',
      'en-US'
    );
    this.validate();
    if (this.studyFormGroup.valid) {
      var studyDTO: StudyDTO = {
        idStudy: 0,
        title: this.studyFormGroup.get('title').value,
        academicDiscipline: this.studyFormGroup.get('academicDiscipline').value,
        description:
          this.studyFormGroup.get('description').value == null
            ? ''
            : this.studyFormGroup.get('description').value,
        psychologistDni: this.psychologistService.getPsychologist().userLoginDTO
          .dni,
        complete:
          this.studyFormGroup.get('endDate').value > this.myDate ? false : true,
        startDate: cValue1.toString(),
        endDate: cValue2.toString(),
        studyCenter: this.studyFormGroup.get('studyCenter').value,
      };
      if (this.data.action == 'create') {
        this.loadingService.changeStateShowLoading(true);

        this.studyService.create(studyDTO).subscribe(
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
        studyDTO.idStudy = this.data.entity.idStudy;
        this.studyService.update(studyDTO).subscribe(
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
        data: 'Se eliminarán los estudios',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.studyService.delete(this.data.entity.idStudy).subscribe(
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
    if (!this.studyFormGroup.get('title').value) {
      this.studyFormGroup.get('title').setErrors({ required: true });
    }
    if (!this.studyFormGroup.get('academicDiscipline').value) {
      this.studyFormGroup
        .get('academicDiscipline')
        .setErrors({ required: true });
    }
    if (!this.studyFormGroup.get('studyCenter').value) {
      this.studyFormGroup.get('studyCenter').setErrors({ required: true });
    }
  }
}
