import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeLanguageFlag = '';
  activeLanguageCode = '';
  unActiveLanguageFlag = '';
  submitStatus: boolean = false;
  store_id: any;

  onType: string = 'number';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('lo');
    this.translateService.use(localStorage.getItem('lang') || 'lo');
  }

  loginForm = new FormGroup({
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
  });

  get getPhone() {
    return this.loginForm.get('phone');
  }

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

    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });
  }

  onSearchChange(searchValue: any): void {
    // console.log(searchValue.value);
    this.onType = 'number';
    if (searchValue.value.length == 8) {
      this.onType = 'string';
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
    this.submitStatus = true;
    // console.log(this.loginForm.controls['phone'].errors);
    // console.log(
    //   'minlength = ',
    //   this.loginForm.controls['phone'].errors?.['minlength']
    // );
    // console.log(
    //   'maxlength = ',
    //   this.loginForm.controls['phone'].errors?.['maxlength']
    // );
    // console.log(this.loginForm.controls['phone'].errors?.['required']);

    if (this.loginForm.invalid) {
      this.submitStatus = false;
      return;
    }

    this.authService.sendOtp(this.phone?.value).subscribe(
      (response: any) => {
        this.onType = 'number';
        this.submitStatus = false;
        if (response.status == 200) {
          this.router.navigate(['/login/otp', this.phone?.value], {
            queryParams: {
              store_id: this.store_id,
              otp: response.otp,
            },
          });
        }
        console.log(response);
      },
      (error) => {
        this.submitStatus = false;
        let msg = error?.msg || 'ເກີດຂໍ້ຜິດພາດບາງຢ່າງ';
        this.snackBar.open(msg, '', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }
}
