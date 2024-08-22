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
import { MatSnackBar } from '@angular/material/snack-bar';

export class details {
  image: any;
  id: any;
  point: any;
  store_id: any;
}
@Component({
  selector: 'app-package-pop-up',
  templateUrl: './package-pop-up.component.html',
  styleUrls: ['./package-pop-up.component.scss'],
})
export class PackagePopUpComponent {
  local_data: any;
  url = environment.imgUrl;
  // store_id: any;
  submitStatus: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private service: PackagePageService,
    public dialogRef: MatDialogRef<PackagePopUpComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: details
  ) {
    this.local_data = data;
  }

  ngOnInit(): void {
    // console.log(this.local_data);
  }

  exchange() {
    // let store_id = localStorage.getItem('store_id');
    this.submitStatus = true;
    this.service
      .prizeExchange(this.local_data.id, this.local_data.store_id)
      .subscribe(
        (res: any) => {
          this.submitStatus = false;
          this.snackBar.open('ສຳເລັດ', '', {
            verticalPosition: 'top',
            duration: 2000,
          });
          this.dialogRef.close();
        },
        (error: any) => {
          this.submitStatus = false;
          let msg = error?.msg || 'ເກີດຂໍ້ຜິດພາດບາງຢ່າງ';
          this.snackBar.open(msg, '', {
            verticalPosition: 'top',
            duration: 3000,
          });
          console.log(error);
        }
      );
  }
}
