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
  pageNumber: any = 1;
  totalProd: any;
  nextPage: Boolean = false;
  prevPage: Boolean = false;
  pageSize: any = 10;
  allPages: any;
  heightBox: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service
      .prizeHistories(this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        console.log(res.data);
        this.prize = res.data;

        this.totalProd = res.total;
        this.allPages = Math.ceil(this.totalProd / this.pageSize);

        if (this.pageNumber == this.allPages) {
          this.nextPage = true;
        } else {
          this.nextPage = false;
        }

        if (this.pageNumber == 1) {
          this.prevPage = true;
        } else {
          this.prevPage = false;
        }
      });
  }

  next(num: number) {
    this.pageNumber += num;

    // for fox

    if (this.pageNumber == this.allPages) {
      console.log(this.pageNumber);

      this.nextPage = true;
    } else {
      this.nextPage = false;
    }

    if (this.pageNumber == 1) {
      this.prevPage = true;
    } else {
      this.prevPage = false;
    }

    this.loadData();
  }
}
