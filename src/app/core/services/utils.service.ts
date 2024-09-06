import { Injectable } from '@angular/core';
import { LayoutService } from '../../pages/dashboard/layout/app.layout.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(public layoutService: LayoutService) {}

  get chartSize() {
    return this.layoutService.isMobile() ? '200px' : '350px';
  }
}
