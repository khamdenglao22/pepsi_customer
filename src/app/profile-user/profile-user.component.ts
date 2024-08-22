import { Component } from '@angular/core';
import { ProfileUserService } from './profile-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent {
  profiles: any;
  store_id: any;
  constructor(
    private service: ProfileUserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });
    this.loadData();
  }

  loadData() {
    this.service.getProfile().subscribe((res: any) => {
      this.profiles = res;
    });
  }

  onLogout() {
    this.authService.removeToken();
    this.router.navigate(['/login'], {
      queryParams: {
        store_id: this.store_id,
      },
    });
  }
}
