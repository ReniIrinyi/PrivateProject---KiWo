import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
