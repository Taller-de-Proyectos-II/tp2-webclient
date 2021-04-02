import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DialogConfirmationModule } from 'src/app/shared/dialog-confirmation/dialog-confirmation.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DialogWorkExperienceComponent } from './dialog-workExperience/dialog-workExperience.component';
import { DialogCourseComponent } from './dialog-course/dialog-course.component';
import { DialogPasswordComponent } from './dialog-password/dialog-password.component';
import { DialogStudyComponent } from './dialog-study/dialog-study.component';
import { DialogConferenceComponent } from './dialog-conference/dialog-conference.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DialogPhotoComponent } from './dialog-photo/dialog-photo.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DialogPasswordComponent,
    DialogCourseComponent,
    DialogStudyComponent,
    DialogWorkExperienceComponent,
    DialogConferenceComponent,
    DialogPhotoComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    MaterialModule,
    DialogConfirmationModule,
  ],
  entryComponents: [
    DialogPasswordComponent,
    DialogCourseComponent,
    DialogStudyComponent,
    DialogWorkExperienceComponent,
    DialogConferenceComponent,
    DialogPhotoComponent
  ],
})
export class ProfileModule {}
