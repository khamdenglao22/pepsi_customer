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
  constructor(private service: PackagePageService, public dialog: MatDialog) {}
  url = environment.imgUrl;
  packages: any;
  currentPoint: any;

  ngOnInit(): void {
    this.loadData();
    this.loadDataPoint();
  }

  loadData() {
    this.service.allPrize().subscribe((res: any) => {
      this.packages = res.data;
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
      // width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.loadDataPoint();
    });
  }
}
