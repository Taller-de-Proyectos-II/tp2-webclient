import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConferenceDTO } from 'src/app/core/models/conferenceDTO.model';
import { ConferenceService } from 'src/app/core/services/conference.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-dialog-conference',
  templateUrl: './dialog-conference.component.html',
  styleUrls: ['./dialog-conference.component.css'],
})
export class DialogConferenceComponent implements OnInit {
  conferenceFormGroup: FormGroup;
  title: string = 'Título de prueba';
  button: string = 'Botón de prueba';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogConferenceComponent>,
    private psychologistService: PsychologistService,
    private router: Router,
    private matDialog: MatDialog,
    private conferenceService: ConferenceService,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    }
    this.loadConferenceFormGroup();
    if (this.data.action == 'create') {
      this.title = 'Agregar Seminario';
      this.button = 'Agregar';
    } else {
      this.conferenceFormGroup.patchValue(this.data.entity);
      this.title = 'Actualizar Seminario';
      this.button = 'Actualizar';
    }
  }

  loadConferenceFormGroup() {
    this.conferenceFormGroup = this.formBuilder.group({
      name: '',
      place: '',
      description: '',
    });
  }

  save() {
    this.validate();
    if (this.conferenceFormGroup.valid) {
      var conferenceDTO: ConferenceDTO = {
        idConference: 0,
        name: this.conferenceFormGroup.get('name').value,
        place: this.conferenceFormGroup.get('place').value,
        description:
          this.conferenceFormGroup.get('description').value == null
            ? ''
            : this.conferenceFormGroup.get('description').value,
        psychologistDni: this.psychologistService.getPsychologist().userLoginDTO
          .dni,
      };
      if (this.data.action == 'create') {
        this.loadingService.changeStateShowLoading(true);
    
        this.conferenceService.create(conferenceDTO).subscribe(
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
        conferenceDTO.idConference = this.data.entity.idConference;
        this.conferenceService.update(conferenceDTO).subscribe(
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
        data: 'Se eliminará el seminario',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.loadingService.changeStateShowLoading(true);
          this.conferenceService.delete(this.data.entity.idConference).subscribe(
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
    if (!this.conferenceFormGroup.get('name').value) {
      this.conferenceFormGroup.get('name').setErrors({ required: true });
    }
    if (!this.conferenceFormGroup.get('place').value) {
      this.conferenceFormGroup.get('place').setErrors({ required: true });
    }
  }
}
