import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.scss'],
})
export class OtpLoginComponent {
  otp: string = '';
  phone: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.phone = String(params.get('phone'));
      // console.log(this.phone);
    });
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    console.log(this.otp);
    console.log(this.otp.length == 4);
  }

  onSubmit() {
    if (this.otp.length == 4) {
      this.authService.login(this.phone, this.otp).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          if (!res.confirm_profile) {
            this.router.navigate(['form-user']);
            return;
          }
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          let msg = error?.msg || 'ເກີດຂໍ້ຜິດພາດບາງຢ່າງ';
          this.snackBar.open(msg, '', {
            verticalPosition: 'top',
            duration: 2000,
          });
        }
      );
    } else {
      this.snackBar.open('ປ້ອນ OTP ໃຫ້ຄົບ', '', {
        verticalPosition: 'top',
        duration: 2000,
      });
    }
  }
}
