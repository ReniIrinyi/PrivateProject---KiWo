import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private cookiesAcceptedSubject = new BehaviorSubject<boolean>(false);
  private cookiesRejectedSubject = new BehaviorSubject<boolean>(false);
  setCookiesRejected(rejected: boolean): void {
    this.cookiesAcceptedSubject.next(rejected);
    if (rejected) {
      localStorage.clear();
    }
  }

  getCookiesRejected(): BehaviorSubject<boolean> {
    return this.cookiesAcceptedSubject;
  }
  setCookiesAccepted(accepted: boolean): void {
    this.cookiesAcceptedSubject.next(accepted);
    if (!accepted) {
      localStorage.clear();
    }
  }

  getCookiesAccepted(): BehaviorSubject<boolean> {
    return this.cookiesAcceptedSubject;
  }
}
