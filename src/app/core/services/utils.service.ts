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

  isDataURL(str: string): boolean {
    const regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@\/?%\s]*\s*$/i;
    return !!str.match(regex);
  }
}
