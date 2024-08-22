import { Component } from '@angular/core';
import { ProfileUserService } from './profile-user.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
}
