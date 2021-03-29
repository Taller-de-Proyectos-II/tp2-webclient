import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private showLoading = new BehaviorSubject<boolean>(false);

  constructor() {}

  changeStateShowLoading(activate: boolean) {
    this.showLoading.next(activate);
  }

  subscribe(work: any) {
    return this.showLoading.subscribe(work);
  }
}
