import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { OtpLoginComponent } from './otp-login/otp-login.component';
import { FormUserComponent } from './form-user/form-user.component';
import { PackagePageComponent } from './package-page/package-page.component';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CartComponent } from './cart/cart.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { PointHistoryComponent } from './profile-user/point-history/point-history.component';
import { AwardHistoryComponent } from './profile-user/award-history/award-history.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'otp-login',
    component: OtpLoginComponent,
  },
  {
    path: 'form-user',
    component: FormUserComponent,
  },

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'package-page',
        component: PackagePageComponent,
      },
      {
        path: 'profile-user',
        component: ProfileUserComponent,
      },
      {
        path: 'profile-user/point-history',
        component: PointHistoryComponent,
      },
      {
        path: 'profile-user/award-history',
        component: AwardHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
