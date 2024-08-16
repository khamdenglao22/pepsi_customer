import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { OtpLoginComponent } from './otp-login/otp-login.component';
import { FormUserComponent } from './form-user/form-user.component';
import { PackagePageComponent } from './package-page/package-page.component';

import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CartComponent } from './cart/cart.component';

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
    path: 'package-page',
    component: PackagePageComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
