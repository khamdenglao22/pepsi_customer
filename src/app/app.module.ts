import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { OtpLoginComponent } from './otp-login/otp-login.component';
import { FormUserComponent } from './form-user/form-user.component';
import { MatIconModule } from '@angular/material/icon';
import { PackagePageComponent } from './package-page/package-page.component';
// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CartComponent } from './cart/cart.component';
import { RewardComponent } from './reward/reward.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { PackagePopUpComponent } from './package-page/package-pop-up/package-pop-up.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { PointHistoryComponent } from './profile-user/point-history/point-history.component';
import { AwardHistoryComponent } from './profile-user/award-history/award-history.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RewardPopupComponent } from './reward/reward-popup/reward-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    OtpLoginComponent,
    FormUserComponent,
    PackagePageComponent,
    HomeComponent,
    HomeLayoutComponent,
    CartComponent,
    PackagePopUpComponent,
    ProfileUserComponent,
    PointHistoryComponent,
    AwardHistoryComponent,
    RewardComponent,
    LoginLayoutComponent,
    RewardPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
