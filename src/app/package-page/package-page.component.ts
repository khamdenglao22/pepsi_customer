import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PackagePopUpComponent } from './package-pop-up/package-pop-up.component';
import { PackagePageService } from './package-page.service';
import { environment } from 'src/environments/environment.development';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Package {
  value: string;
  viewValue: string;
  imgValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss'],
})
export class PackagePageComponent {
  constructor(
    private service: PackagePageService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  url = environment.imgUrl;
  packages: any;
  currentPoint: any;
  store_id: any;

  ngOnInit(): void {
    this.loadData();
    this.loadDataPoint();
    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });

    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: {
          store_id: this.store_id,
        },
      });
      return;
    }
  }

  loadData() {
    this.service.allPrize().subscribe((res: any) => {
      this.packages = res.data;
      // console.log(res);
    });
  }

  loadDataPoint() {
    this.service.getProfile().subscribe((res: any) => {
      this.currentPoint = res;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any
  ): void {
    const dialogRef = this.dialog.open(PackagePopUpComponent, {
      width: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: data.id,
        image: data.image,
        point: data.point,
        store_id: parseInt(this.store_id),
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.loadDataPoint();
    });
  }
}
