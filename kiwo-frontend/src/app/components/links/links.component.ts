import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/IconService';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss'],
    standalone: false
})
export class LinksComponent implements OnInit {
  constructor(
    private iconService: IconService,
    private screenSizeService: ScreenSizeService,
    private router: Router
  ) {}
  isSmallScreen = false;
  currentIcon: any;

  ngOnInit(): void {
    this.iconService.currentIcon$.subscribe((icon) => {
      this.currentIcon = icon;
    });
    this.screenSizeService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }

  //  scrolls to the page element
  //  @param page => the id of the page element to scroll to.
  scrollTo(page: string) {
    const element = document.getElementById(page);
    if (page) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  handleLinkClick(page: string) {
    this.scrollTo(page);
    this.router.navigate(['/home'], { fragment: page }); // Navigate to the route with fragment
  }
  changeIcon() {
    if (this.isSmallScreen) {
      const links = document.querySelector('.links');
      this.iconService.toggleIcon();
      links?.classList.toggle('transformX');
    }
  }
}
