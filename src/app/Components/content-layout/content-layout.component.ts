import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IonApp, IonRouterOutlet, IonIcon } from '@ionic/angular/standalone';
import {
  Router,
  RouterLink,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/service/navigation.service';
import { filter } from 'rxjs/operators';
import { DISABLED_ROUTES } from 'src/app/utils/Constant';
import { IonContent } from '@ionic/angular';
import { receiptOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  imports: [
    CommonModule,
    NzIconModule,
    IonRouterOutlet,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    RouterOutlet,
  ],
})
export class ContentLayoutComponent implements OnInit {
  hideNavBar: boolean = false;
  disableRoutes = DISABLED_ROUTES;
  routesWithoutNavBar: string[];
  currentRoute: string = '';

  constructor(private router: Router) {
    addIcons({
      receiptOutline,
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.routesWithoutNavBar = Object.values(this.disableRoutes);
        this.hideNavBar = this.routesWithoutNavBar.some((route) =>
          event.urlAfterRedirects.includes(route)
        );
        this.currentRoute = event.urlAfterRedirects;
      });
    // Change 'light' to 'light-mode'
    if (localStorage.getItem('theme') !== 'light') {
      document.documentElement.classList.add('light-mode');
    }

    this.routesWithoutNavBar = Object.values(this.disableRoutes);
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  toggleDarkMode() {
    const html = document.documentElement;
    // Change 'light' to 'light-mode'
    html.classList.toggle('light-mode');

    // Update localStorage accordingly
    if (html.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }

  ngOnInit() {}
}
