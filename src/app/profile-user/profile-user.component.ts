import { Component } from '@angular/core';
import { ProfileUserService } from './profile-user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent {
  profiles: any;
  constructor(private service: ProfileUserService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getProfile().subscribe((res: any) => {
      this.profiles = res;
    });
  }
}
