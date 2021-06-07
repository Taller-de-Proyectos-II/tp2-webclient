import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAdminComponent } from 'src/app/layout-admin/layout.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
      path: '',
      component: LoginAdminComponent,
    },
    {
      path: 'welcome',
      component: LayoutAdminComponent,
      children: [
        {
          path: '',
          component: WelcomeComponent,
        },
      ],
    },
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginAdminRoutingModule { }
