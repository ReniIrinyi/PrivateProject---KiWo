import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    standalone: false
})
export class AboutComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}
  appdata: any = [];

  ngOnInit(): void {
    this.getData();
  }
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
  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.anmeldung;
    });
  }
}
