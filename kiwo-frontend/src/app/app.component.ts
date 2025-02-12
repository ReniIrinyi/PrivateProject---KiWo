import { Component, OnInit } from '@angular/core';
import { DataService } from './service/DataService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}
  status: any = [];

  ngOnInit(): void {
    this.getData();
    this.getRegistrationStatus();
  }

  getData() {
    this.dataService.fetchData();
  }

  getRegistrationStatus() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.status = this.dataService.anmeldung.status;
    });
  }
}
