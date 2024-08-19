import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeLanguageFlag = '';
  activeLanguageCode = '';
  unActiveLanguageFlag = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    phone: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    if (lang == 'en') {
      this.activeLanguageFlag = 'assets/images/en-icon.svg';
      this.unActiveLanguageFlag = 'assets/images/laos-flag.png';
    } else {
      this.activeLanguageFlag = 'assets/images/laos-flag.png';
      this.unActiveLanguageFlag = 'assets/images/en-icon.svg';
      localStorage.setItem('lang', 'lo');
    }
  }

  public onBtnChangeLanguageClick() {
    let lang = localStorage.getItem('lang');
    if (lang == 'lo') {
      lang = 'en';
    } else {
      lang = 'lo';
    }

    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  get phone() {
    return this.loginForm.get('phone');
  }

  sendOtp() {
    if (this.loginForm.invalid) {
      this.snackBar.open('test', '', {
        verticalPosition: 'top',
        duration: 2000,
      });
      return;
    }

    this.authService.sendOtp(this.phone?.value).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.router.navigate(['/login/otp', this.phone?.value]);
        }
        console.log(response);
      },
      (error) => {
        let msg = error?.msg || 'ເກີດຂໍ້ຜິດພາດບາງຢ່າງ';
        this.snackBar.open(msg, '', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }
}
