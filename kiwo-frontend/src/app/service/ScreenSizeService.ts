import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private isSmallScreenSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkDeviceWidth();
    // Listen to window resize events and update isSmallScreen accordingly
    window.addEventListener('resize', this.checkDeviceWidth.bind(this));
  }

  private checkDeviceWidth() {
    const isSmall = window.innerWidth < 667;
    this.isSmallScreenSubject.next(isSmall);
  }

  get isSmallScreen$(): Observable<boolean> {
    return this.isSmallScreenSubject.asObservable();
  }
}
