import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookiesService } from 'src/app/service/CookiesService';

@Component({
  selector: 'app-cookies-settings',
  templateUrl: './cookies-settings.component.html',
  styleUrls: ['./cookies-settings.component.scss'],
})
export class CookiesSettingsComponent {
  cookiesAccepted: boolean;

  constructor(
    public dialogRef: MatDialogRef<CookiesSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cookiesService: CookiesService
  ) {
    this.cookiesAccepted = data.cookiesAccepted;
  }

  onSaveClick(): void {
    this.cookiesService.setCookiesAccepted(this.cookiesAccepted);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onRejectAllClick(): void {
    this.cookiesService.setCookiesRejected(true);
  }
}
