import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseDTO } from 'src/app/core/models/courseDTO.model';
import { CourseService } from 'src/app/core/services/course.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-dialog-course',
  templateUrl: './dialog-course.component.html',
  styleUrls: ['./dialog-course.component.css'],
})
export class DialogCourseComponent implements OnInit {
  courseFormGroup: FormGroup;
  title: string = 'Título de prueba';
  button: string = 'Botón de prueba';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogCourseComponent>,
    private psychologistService: PsychologistService,
    private router: Router,
    private matDialog: MatDialog,
    private courseService: CourseService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    }
    this.loadCourseFormGroup();
    if (this.data.action == 'create') {
      this.title = 'Agregar Curso';
      this.button = 'Agregar';
    } else {
      this.courseFormGroup.patchValue(this.data.entity);
      this.title = 'Actualizar Curso';
      this.button = 'Actualizar';
    }
  }

  loadCourseFormGroup() {
    this.courseFormGroup = this.formBuilder.group({
      name: '',
      studyCenter: '',
      description: '',
    });
  }

  save() {
    this.validate();
    if (this.courseFormGroup.valid) {
      var courseDTO: CourseDTO = {
        idCourse: 0,
        name: this.courseFormGroup.get('name').value,
        studyCenter: this.courseFormGroup.get('studyCenter').value,
        description:
          this.courseFormGroup.get('description').value == null
            ? ''
            : this.courseFormGroup.get('description').value,
        psychologistDni: this.psychologistService.getPsychologist().userLoginDTO
          .dni,
      };
      if (this.data.action == 'create') {
        this.loadingService.changeStateShowLoading(true);
    
        this.courseService.create(courseDTO).subscribe(
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
        courseDTO.idCourse = this.data.entity.idCourse;
        this.courseService.update(courseDTO).subscribe(
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
        data: 'Se eliminará el curso',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.courseService.delete(this.data.entity.idCourse).subscribe(
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
    if (!this.courseFormGroup.get('name').value) {
      this.courseFormGroup.get('name').setErrors({ required: true });
    }
    if (!this.courseFormGroup.get('studyCenter').value) {
      this.courseFormGroup.get('studyCenter').setErrors({ required: true });
    }
  }
}
