import { Component } from '@angular/core';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.scss'],
})
export class OtpLoginComponent {
  otp: string = '';

  onOtpChange(otp: any) {
    this.otp = otp;
    console.log(this.otp);
    console.log(this.otp.length == 4);
  }
}
