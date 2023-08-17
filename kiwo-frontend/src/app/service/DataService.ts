import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { AppData } from '../model/AppData';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new ReplaySubject<AppData>(1);
  //status=active ? open registration : close registration
  private projectUrl = './assets/kiwo-daten.json';
  team: any[] = [];
  anmeldung: any = {};
  imgs: string[] = [];
  registration: any = {};

  constructor(private http: HttpClient) {}

  fetchData(): void {
    this.http.get<AppData>(this.projectUrl).subscribe((data) => {
      this.team = data.Team;
      this.anmeldung = data.Anmeldung;
      this.registration = data.Registration;
      for (const imgKey in data.KiwoImages) {
        if (data.KiwoImages.hasOwnProperty(imgKey)) {
          const imgPath = data.KiwoImages[imgKey];
          this.imgs.push(imgPath.toString());
        }
      }

      // Emit the fetched data
      this.dataSubject.next(data);
    });
  }

  getTeamData() {
    return this.team;
  }

  getAnmeldungData() {
    return this.anmeldung;
  }

  getImgs() {
    return this.imgs;
  }

  getDataObservable(): Observable<AppData> {
    return this.dataSubject.asObservable();
  }
}
