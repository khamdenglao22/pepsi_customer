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
  packages: Package[] = [
    {
      value: '10',
      viewValue: 'Steak',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Pizza',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Tacos',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Steak',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Pizza',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Tacos',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Steak',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Pizza',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Tacos',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Steak',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Pizza',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
    {
      value: '10',
      viewValue: 'Tacos',
      imgValue: '../../assets/images/pepsi-shirt.png',
    },
  ];
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(PackagePopUpComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
