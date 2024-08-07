import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from 'src/app/shared/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList | undefined;
  token: any = localStorage.getItem('token');
  tokenPayload: any;

  private _mobileQueryListner: () => void;

  constructor(cdr: ChangeDetectorRef,
    media: MediaMatcher,
    public menuitems: MenuItems
  ) {
    this.tokenPayload = jwtDecode(this.token);
    this.mobileQuery = media.matchMedia('(min-width:768)');
    this._mobileQueryListner = () => cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListner);
  }

  ngOnDestroy(): void {
    this.mobileQuery?.removeListener(this._mobileQueryListner);
  }
}
