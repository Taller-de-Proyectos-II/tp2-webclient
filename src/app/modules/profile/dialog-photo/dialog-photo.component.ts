import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PsychologistDTO } from 'src/app/core/models/psychologistDTO.model';
import { ImageService } from 'src/app/core/services/image.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.css'],
})
export class DialogPhotoComponent implements OnInit {
  selectedFile: File = null;
  psychologist: PsychologistDTO = null;

  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private snackBarservice: SnackBarService,
    public matDialogRef: MatDialogRef<DialogPhotoComponent>
  ) {}

  ngOnInit(): void {}

  onFileSelected(event) {
    this.psychologist = JSON.parse(localStorage.getItem('psychologist'));
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const dni = this.psychologist.userLoginDTO.dni;
    this.loadingService.changeStateShowLoading(true);
    this.imageService
      .setPsychologistImageInApi(dni, this.selectedFile)
      .subscribe(
        (data: any) => {
          this.snackBarservice.info(data.message);
          this.loadingService.changeStateShowLoading(false);
          if (data.status == 1) {
            this.matDialogRef.close(true);
          }
        },
        (error) => {
          this.snackBarservice.info('Error en el servidor');
          this.loadingService.changeStateShowLoading(false);
        }
      );
  }

  cancel() {
    this.matDialogRef.close(false);
  }
}
