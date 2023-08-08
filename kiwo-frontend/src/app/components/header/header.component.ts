import { Component, HostListener, OnInit } from '@angular/core';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { ScrollService } from 'src/app/service/ScrollService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private scrollService: ScrollService) {}
  isSmallScreen = false;
  faBars = faBars;
  faX = faX;
  currentIcon = faBars;

  ngOnInit(): void {
    this.checkDevicewidth();
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
    if (this.currentIcon === faBars) {
      this.currentIcon = faX;
      links?.classList.remove('transformX');
    } else {
      this.currentIcon = faBars;
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
