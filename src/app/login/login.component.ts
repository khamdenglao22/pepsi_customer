import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeLanguageFlag = '';
  activeLanguageCode = '';
  unActiveLanguageFlag = '';

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
}
