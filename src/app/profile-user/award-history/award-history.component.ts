import { Component } from '@angular/core';
import { ProfileUserService } from '../profile-user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-award-history',
  templateUrl: './award-history.component.html',
  styleUrls: ['./award-history.component.scss'],
})
export class AwardHistoryComponent {
  constructor(private service: ProfileUserService) {}
  url = environment.imgUrl;
  prize: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.prizeHistories().subscribe((res: any) => {
      console.log(res.data);
      this.prize = res.data;
    });
  }
}
