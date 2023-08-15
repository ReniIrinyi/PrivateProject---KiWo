import { Component, HostListener, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/IconService';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  constructor(
    private iconService: IconService,
    private screenSizeService: ScreenSizeService
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
  changeIcon() {
    if (this.isSmallScreen) {
      const links = document.querySelector('.links');
      this.iconService.toggleIcon();
      links?.classList.toggle('transformX');
    }
  }
}
