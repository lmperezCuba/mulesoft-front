import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { INavItem } from './nav-item';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { NavService } from './nav.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit {
  @HostBinding('attr.aria-expanded') ariaExpanded = false;
  @Input() item: INavItem = { displayName: '', iconName: '' };
  @Input() depth = 0;
  expanded = false;
  matchOptions: IsActiveMatchOptions;

  constructor(
    public navService: NavService,
    public router: Router,
    private matSidenav: MatSidenav
  ) {
    this.ariaExpanded = this.expanded;
    this.matchOptions = {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };
  }

  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: INavItem): void {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]).then(null, null);
      this.close();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  close(): void {
    if (this.matSidenav.mode === 'over') {
      void this.matSidenav.close().then();
    }
  }
}
