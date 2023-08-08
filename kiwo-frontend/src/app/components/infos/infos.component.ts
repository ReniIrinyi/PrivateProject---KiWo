import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/DataService';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss'],
})
export class InfosComponent implements OnInit {
  constructor(private dataService: DataService) {}

  appdata: any = {};
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.dataService.getDataObservable().subscribe((data) => {
      this.appdata = this.dataService.anmeldung;
    });
  }
}
