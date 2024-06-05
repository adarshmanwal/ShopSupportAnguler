import { Component } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  collapsed = true;
  menuItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Shop', icon: 'shop' },
    // { name: 'Profile', icon: 'person' },
    // { name: 'Help', icon: 'help' }
  ];

  expandNav() {
    this.collapsed = false;
  }

  collapseNav() {
    this.collapsed = true;
  }
}