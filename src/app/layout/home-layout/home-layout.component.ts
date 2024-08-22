import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent {
  store_id: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // const store_id_storage = localStorage.getItem('store_id');
    // console.log('store_id_storage' + store_id_storage);
    // if (store_id_storage != null) {
    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });
    // }
    console.log('home layout =' + this.store_id);

    const token = this.authService.getToken();
    if (!token) {
      this.redirectToLogin();
      return;
    }
  }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
