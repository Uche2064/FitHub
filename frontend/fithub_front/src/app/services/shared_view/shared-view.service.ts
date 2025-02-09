import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Views } from '../../utils/view.enum';

@Injectable({
  providedIn: 'root'
})
export class SharedViewService {
  private view  = new BehaviorSubject<Views>(Views.DASHBOARD);

  viewObservable$: Observable<Views> = this.view.asObservable();
  constructor() { }

  changeView(view: Views) {
    this.view.next(view);
  }
}
