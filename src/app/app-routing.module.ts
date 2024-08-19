import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { OtpLoginComponent } from './otp-login/otp-login.component';
import { FormUserComponent } from './form-user/form-user.component';
import { PackagePageComponent } from './package-page/package-page.component';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CartComponent } from './cart/cart.component';
import { RewardComponent } from './reward/reward.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'cart/:store_id',
        component: CartComponent,
      },

      {
        path: 'reward',
        component: RewardComponent,
      },
      {
        path: 'package-page',
        component: PackagePageComponent,
      },
    ],
  },

  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'login/otp/:phone',
        component: OtpLoginComponent,
      },
      {
        path: 'form-user',
        component: FormUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
