import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class InfosComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private screenSizeService: ScreenSizeService,
    private router: Router
  ) {}

  isSmallScreen = false;
  appdata: any = {};

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

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.anmeldung;
    });
    this.screenSizeService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }
}
