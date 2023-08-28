import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private dataService: DataService) {}

  appdata: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.registration;
    });
  }
}
