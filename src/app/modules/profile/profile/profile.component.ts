import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConferenceDTO } from 'src/app/core/models/conferenceDTO.model';
import { CourseDTO } from 'src/app/core/models/courseDTO.model';
import { StudyDTO } from 'src/app/core/models/studyDTO.model';
import { WorkExperienceDTO } from 'src/app/core/models/workExperienceDTO.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PsychologistService } from 'src/app/core/services/psychologist.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogConferenceComponent } from '../dialog-conference/dialog-conference.component';
import { DialogCourseComponent } from '../dialog-course/dialog-course.component';
import { DialogPasswordComponent } from '../dialog-password/dialog-password.component';
import { DialogStudyComponent } from '../dialog-study/dialog-study.component';
import { DialogWorkExperienceComponent } from '../dialog-workExperience/dialog-workExperience.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  psychologistFormGroup: FormGroup;
  myDate = new Date();
  courses: ConferenceDTO[] = [];
  conferences: CourseDTO[] = [];
  studies: StudyDTO[] = [];
  workExperiences: WorkExperienceDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private psychologistService: PsychologistService,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
    private loadingService: LoadingService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadPsychologistFormGroup();

    if (this.psychologistService.getPsychologist() == null) {
      this.router.navigate(['/']).then();
    } else {
      this.loadFromService();
      if (this.psychologistService.getExperience() == null) {
        this.getExperience();
      } else this.loadExperienceFromService();
    }
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
    var psychologist = this.psychologistFormGroup.value;
    this.matDialog.open(DialogPasswordComponent, {
      disableClose: true,
      data: psychologist,
    });
  }

  getExperience() {
    this.loadingService.changeStateShowLoading(true);
    this.psychologistService
      .listExperienceByDni(
        this.psychologistService.getPsychologist().userLoginDTO.dni
      )
      .subscribe(
        (data: any) => {
          if (data.experienceDTO) {
            this.psychologistService.setExperience(data.experienceDTO);
            this.loadExperienceFromService();
          }
          this.loadingService.changeStateShowLoading(false);
        },
        (error) => {
          this.loadingService.changeStateShowLoading(false);
          this.snackBarService.info('Error en el servidor');
        }
      );
  }

  loadExperienceFromService() {
    this.conferences = this.psychologistService.getExperience().conferences;
    this.courses = this.psychologistService.getExperience().courses;
    this.studies = this.psychologistService.getExperience().studies;
    this.workExperiences = this.psychologistService.getExperience().workExperiences;
  }

  openDialog(word: String, action: String, entity: any) {
    if (word == 'course') {
      this.matDialog
        .open(DialogCourseComponent, {
          disableClose: true,
          data: {
            action: action,
            entity: entity,
          },
        })
        .afterClosed()
        .subscribe((confirm: boolean) => {
          if (confirm == true) {
            this.getExperience();
          }
        });
    }
    if (word == 'study') {
      this.matDialog
        .open(DialogStudyComponent, {
          disableClose: true,
          data: {
            action: action,
            entity: entity,
          },
        })
        .afterClosed()
        .subscribe((confirm: boolean) => {
          if (confirm == true) {
            this.getExperience();
          }
        });
    }
    if (word == 'workExperience') {
      this.matDialog
        .open(DialogWorkExperienceComponent, {
          disableClose: true,
          data: {
            action: action,
            entity: entity,
          },
        })
        .afterClosed()
        .subscribe((confirm: boolean) => {
          if (confirm == true) {
            this.getExperience();
          }
        });
    }
    if (word == 'conference') {
      this.matDialog
        .open(DialogConferenceComponent, {
          disableClose: true,
          data: {
            action: action,
            entity: entity,
          },
        })
        .afterClosed()
        .subscribe((confirm: boolean) => {
          if (confirm == true) {
            this.getExperience();
          }
        });
    }
  }
}
