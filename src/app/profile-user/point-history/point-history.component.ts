import { Component } from '@angular/core';
import { ProfileUserService } from '../profile-user.service';

@Component({
  selector: 'app-point-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.scss'],
})
export class PointHistoryComponent {
  point: any;
  constructor(private service: ProfileUserService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.pointHistories().subscribe((res: any) => {
      console.log(res.data);

      this.point = res.data;
    });
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
}
