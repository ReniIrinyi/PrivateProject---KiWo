import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private isStickySubject = new Subject<boolean>();
  isSticky$ = this.isStickySubject.asObservable();

  // Set the sticky status
  setIsSticky(isSticky: boolean) {
    this.isStickySubject.next(isSticky);
  }
}
