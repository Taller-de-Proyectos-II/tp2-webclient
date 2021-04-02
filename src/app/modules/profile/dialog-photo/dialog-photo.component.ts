import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/core/services/image.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrls: ['./dialog-photo.component.css'],
})
export class DialogPhotoComponent implements OnInit {
  selectedFile: File = null;

  constructor(
    private imageService: ImageService,
    private loadingService: LoadingService,
    private psychologistService: PsychologistService,
    private snackBarservice: SnackBarService,
    public matDialogRef: MatDialogRef<DialogPhotoComponent>
  ) {}

  ngOnInit(): void {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const dni = this.psychologistService.getPsychologist().userLoginDTO.dni;
    this.loadingService.changeStateShowLoading(true);
    this.imageService
      .setPsychologistImageInApi(dni, this.selectedFile)
      .subscribe((data: any) => {
        this.snackBarservice.info(data.message);
        this.loadingService.changeStateShowLoading(false);
        if (data.status == 1) {
          this.matDialogRef.close(true);
        }
      }, (error) => {
        this.snackBarservice.info("Error en el servidor");
        this.loadingService.changeStateShowLoading(false);
      });
  }

  cancel() {
    this.matDialogRef.close(false);
  }
}
