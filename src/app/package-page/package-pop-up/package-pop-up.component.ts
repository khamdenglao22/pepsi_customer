import { Component, inject } from '@angular/core';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-package-pop-up',
  templateUrl: './package-pop-up.component.html',
  styleUrls: ['./package-pop-up.component.scss'],
})
export class PackagePopUpComponent {
  readonly dialogRef = inject(MatDialogRef<PackagePopUpComponent>);
}
