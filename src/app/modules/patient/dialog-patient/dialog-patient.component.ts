import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PatientDTO } from 'src/app/core/models/patientDTO.model';
import { GuardianDTO } from 'src/app/core/models/guardianDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { GuardianService } from '../../../core/services/guardian.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css'],
})
export class DialogPatientComponent implements OnInit {
  patient: PatientDTO = null;
  guardians: GuardianDTO[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DialogPatientComponent>,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService,
    private guardianService: GuardianService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.patient = this.data;
    this.loadGuardians();
  }

  loadGuardians() {
    this.loadingService.changeStateShowLoading(true);
    this.guardianService.findByDni(this.data.userLoginDTO.dni).subscribe(
      (data: any) => {
        if (data.guardiansDTO) {
          this.guardians = data.guardiansDTO;
        }
        this.loadingService.changeStateShowLoading(false);
        this.guardians.forEach((element) => {
          this.loadPhoto(element.dni);
        });
      },
      (error) => {
        this.loadingService.changeStateShowLoading(false);
        this.snackBarService.info('Error en el servidor');
      }
    );
  }

  cancel() {
    this.matDialogRef.close();
  }

  loadPhoto(dni) {
    let index = this.guardians.findIndex((element) => element.dni == dni);
    var retrieveURL = '../../../assets/images/loading.gif';
    this.guardians[index].imageURL = retrieveURL;
    this.imageService
      .getGuardianImageFromApi(dni, this.patient.userLoginDTO.dni)
      .subscribe(
        (data: any) => {
          var reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = (_event) => {
            retrieveURL = reader.result as string;
            this.guardians[index].imageURL = retrieveURL;
          };
        },
        (error) => {
          retrieveURL = '../../../assets/images/photo.png';
          this.guardians[index].imageURL = retrieveURL;
        }
      );
  }
}
