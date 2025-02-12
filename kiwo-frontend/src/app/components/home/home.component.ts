import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

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
}
