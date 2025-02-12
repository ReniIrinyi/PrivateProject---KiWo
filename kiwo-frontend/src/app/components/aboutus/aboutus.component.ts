import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { ScreenSizeService } from 'src/app/service/ScreenSizeService';

@Component({
    selector: 'app-aboutus',
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.scss'],
    standalone: false
})
export class AboutusComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private screenSizeService: ScreenSizeService
  ) {}
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;
  faDotCircle = faCircle;
  appdata: any[] = [];
  currentIndex = 0;
  isSmallScreen = false;

  ngOnInit(): void {
    this.getData();
    this.screenSizeService.isSmallScreen$.subscribe((isSmall) => {
      this.isSmallScreen = isSmall;
    });
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.team;
    });
  }

  changePageOnClick(change: number) {
    this.currentIndex =
      (this.currentIndex + change + this.appdata.length) % this.appdata.length;
  }
}
