import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';
@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class InfosComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private screenSizeService: ScreenSizeService
  ) {}
  isSmallScreen = false;
  appdata: any = {};
  ngOnInit(): void {
    this.getData();
  }
  scrollTo(page: string) {
    const element = document.getElementById(page);
    if (page) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
