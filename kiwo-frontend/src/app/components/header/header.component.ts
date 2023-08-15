import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/service/ScrollService';
import { IconService } from 'src/app/service/IconService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private scrollService: ScrollService,
    private iconService: IconService
  ) {}
  isSmallScreen = false;
  currentIcon: any;

  ngOnInit(): void {
    this.checkDevicewidth();
    this.iconService.currentIcon$.subscribe((icon) => {
      this.currentIcon = icon;
    });
  }

  // Returns an Observable that indicates the sticky status.
  get isSticky(): Observable<boolean> {
    return this.scrollService.isSticky$;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDevicewidth();
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    const homeSectionHeight =
      document.getElementById('home')?.clientHeight || 0;
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const isSticky = scrollPosition >= homeSectionHeight;
    this.scrollService.setIsSticky(isSticky);
  }
  checkDevicewidth() {
    this.isSmallScreen = false;
    if (window.innerWidth < 1000) {
      this.isSmallScreen = true;
    }
    this.moveLinksToRights();
  }
  changeIcon() {
    const links = document.querySelector('.links');
    if (
      this.iconService.getCurrentIconValue() === this.iconService.icons.faBars
    ) {
      this.iconService.toggleIcon();
      links?.classList.remove('transformX');
    } else {
      this.iconService.toggleIcon();
      links?.classList.add('transformX');
    }
  }

  moveLinksToRights() {
    const links = document.querySelector('.links');
    if (this.isSmallScreen) {
      links?.classList.add('transformX');
    } else if (!this.isSmallScreen) {
      links?.classList.remove('transformX');
    }
  }
}
