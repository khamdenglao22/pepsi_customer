import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Component } from '@angular/core';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(RewardPopupComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  // confetti({
  //   angle: randomInRange(55, 125),
  //   spread: randomInRange(50, 70),
  //   particleCount: randomInRange(50, 100),
  //   origin: { y: 0.6 },
  // });
}
