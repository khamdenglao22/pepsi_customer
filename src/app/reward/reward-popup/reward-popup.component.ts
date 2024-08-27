import { Component, Inject, Optional } from '@angular/core';
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
  img: any;
}

@Component({
  selector: 'app-reward-popup',
  templateUrl: './reward-popup.component.html',
  styleUrls: ['./reward-popup.component.scss'],
})
export class RewardPopupComponent {
  url = environment.imgUrl;
  local_data: any;
  constructor(
    public dialogRef: MatDialogRef<RewardPopupComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: details
  ) {
    this.local_data = data;
  }

  ngOnInit(): void {
    // console.log(this.local_data);
  }
}
