import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  constructor(private dataService: DataService) {}
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;
  faDotCircle = faCircle;
  appdata: any[] = [];
  currentIndex = 0;

  ngOnInit(): void {
    this.getData();
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
