import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Route, Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  showHeader: boolean = true;
  currentRoute: string = '';
  ngOnInit(): void {
    this.auth.autoLogin();
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = this.router.url;
      this.showHeader = this.shouldShowHeader(this.currentRoute);
    });
  }
  shouldShowHeader(url: string): boolean {
    // Define logic to determine if the header should be shown based on the URL
    const hiddenRoutes = ['/auth', '/register','/auth/signin','/auth/signup']; // Add routes that should not display the header
    return !hiddenRoutes.includes(url);
  }
  title = 'ShopSupport';
}
