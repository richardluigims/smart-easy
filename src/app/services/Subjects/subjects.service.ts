import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private homeDataSubject = new BehaviorSubject<any>(null);
  private pageHeadSubject = new BehaviorSubject<any>(null);

  constructor() { }

  setHomeData(data: any): void {
    this.homeDataSubject.next(data);
  }

  getHomeData(): any {
    return this.homeDataSubject.asObservable();
  }

  SetPageHead(data: any) {
    this.pageHeadSubject.next(data);
  }

  GetPageHead(): any {
    return this.pageHeadSubject.asObservable();
  }
}
