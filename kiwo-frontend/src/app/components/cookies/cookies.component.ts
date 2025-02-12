import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookiesSettingsComponent } from '../cookies-settings/cookies-settings.component';
import { CookiesService } from 'src/app/service/CookiesService';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cookies',
    templateUrl: './cookies.component.html',
    styleUrls: ['./cookies.component.scss'],
    standalone: false
})
export class CookiesComponent implements OnInit, OnDestroy {
  private cookiesRejectedSubscription: Subscription | undefined;
  private dialogRef: MatDialogRef<CookiesSettingsComponent> | undefined;

  cookiesAccepted: boolean = false;
  cookiesRejected: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cookiesService: CookiesService
  ) {}

  ngOnInit(): void {
    this.cookiesService.getCookiesAccepted().subscribe((accepted) => {
      this.cookiesAccepted = accepted;
    });
    this.cookiesService.getCookiesRejected().subscribe((rejected) => {
      this.cookiesRejected = rejected;
    });

    this.cookiesRejectedSubscription = this.cookiesService
      .getCookiesRejected()
      .subscribe(() => {
        this.closeDialog();
      });
  }

  ngOnDestroy(): void {
    this.cookiesRejectedSubscription?.unsubscribe();
  }

  openSettings(): void {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      return;
    }
    this.dialogRef = this.dialog.open(CookiesSettingsComponent, {
      width: '400px',
      data: { acceptAllCookies: false, cookiesComponent: this },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result && result.acceptAllCookies) {
        localStorage.setItem('cookiesAccepted', 'true');
        this.cookiesService.setCookiesAccepted(false);
        this.closeDialog();
      }
    });
  }

  acceptCookies(): void {
    localStorage.setItem('cookiesAccepted', 'true');
    this.cookiesService.setCookiesAccepted(true);
  }

  scrollTo(page: string) {
    const element = document.getElementById(page);
    if (page) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  handleLinkClickTo(route: string, page: string) {
    this.scrollTo(page);
    this.router.navigate([route], { fragment: page });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
