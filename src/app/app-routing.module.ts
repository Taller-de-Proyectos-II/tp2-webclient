import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login-admin',
    loadChildren: () =>
      import('./modules/login-admin/login-admin.module').then((m) => m.LoginAdminModule),
  },
  {
    path: 'myprofile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./modules/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'general-view',
    loadChildren: () =>
      import('./modules/general-view/general-view.module').then((m) => m.GeneralViewModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./modules/schedule/schedule.module').then(
        (m) => m.ScheduleModule
      ),
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./modules/session/session.module').then(
        (m) => m.SessionModule
      ),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./modules/help/help.module').then((m) => m.HelpModule),
  },
  {
    path: 'training-admin',
    loadChildren: () =>
      import('./modules/training-admin/training-admin.module').then((m) => m.TrainingAdminModule),
  },
  {
    path: 'default-admin',
    loadChildren: () =>
      import('./modules/default-admin/default-admin.module').then((m) => m.DefaultAdminModule),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
