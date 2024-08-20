import { Component, Inject, Optional } from '@angular/core';
import { PackagePageService } from '../package-page.service';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { environment } from 'src/environments/environment.development';

export class details {
  image: any;
  id: any;
  point: any;
}
@Component({
  selector: 'app-package-pop-up',
  templateUrl: './package-pop-up.component.html',
  styleUrls: ['./package-pop-up.component.scss'],
})
export class PackagePopUpComponent {
  local_data: any;
  url = environment.imgUrl;
  store_id: any;

  constructor(
    private service: PackagePageService,
    public dialogRef: MatDialogRef<PackagePopUpComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: details
  ) {
    this.local_data = data;
  }

  ngOnInit(): void {
    console.log(this.local_data.id);
    this.store_id = localStorage.getItem('store_id');
    console.log(this.store_id);
  }

  exchange() {
    // let store_id = localStorage.getItem('store_id');

    this.service
      .prizeExchange(this.store_id, this.local_data.id)
      .subscribe((res: any) => {
        this.dialogRef.close();
      });
  }
}
