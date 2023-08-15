import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private currentIconSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    faBars
  );
  public currentIcon$: Observable<any> = this.currentIconSubject.asObservable();
  public icons = {
    faBars,
    faX,
  };
  constructor() {}

  getCurrentIconValue(): any {
    return this.currentIconSubject.value;
  }

  toggleIcon() {
    this.currentIconSubject.next(
      this.currentIconSubject.value === this.icons.faBars
        ? this.icons.faX
        : this.icons.faBars
    );
  }
}
