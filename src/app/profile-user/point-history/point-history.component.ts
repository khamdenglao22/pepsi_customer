import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProfileUserService } from '../profile-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-point-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.scss'],
})
export class PointHistoryComponent {
  // @ViewChild('boxPoint') boxPoint!: ElementRef;
  point: any = [];
  store_id: any;
  constructor(
    private service: ProfileUserService,
    private route: ActivatedRoute
  ) {}
  pageNumber: any = 1;
  totalProd: any;
  nextPage: Boolean = false;
  prevPage: Boolean = false;
  pageSize: any = 10;
  allPages: any;
  heightBox: any;

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });
    this.loadData();
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.heightBox = this.boxPoint.nativeElement.clientHeight;
  //     console.log(this.heightBox);
  //     this.boxPoint.nativeElement.style.minHeight = `calc()`;
  //   }, 300);
  // }

  loadData() {
    this.service
      .pointHistories(this.pageNumber, this.pageSize)
      .subscribe((res: any) => {
        this.point = res.data;
        this.totalProd = res.total;
        this.allPages = Math.ceil(this.totalProd / this.pageSize);

        // console.log(this.point.length);

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

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }
}
