import { Component, HostListener, OnInit } from '@angular/core';
import { faBars, faX, faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  isSmallScreen = false;
  ngOnInit(): void {
    this.checkDevicewidth();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkDevicewidth();
  }
  checkDevicewidth() {
    this.isSmallScreen = false;
    if (window.innerWidth < 1000) {
      this.isSmallScreen = true;
    }
  }
  //  scrolls to the page element
  //  @param page => the id of the page element to scroll to.
  scrollTo(page: string) {
    const element = document.getElementById(page);
    if (page) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
