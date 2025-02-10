import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/Service/navigation.service';
import { filter } from 'rxjs/operators';

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
  ],
})
export class ContentLayoutComponent implements OnInit {
  hideNavBar: boolean = false;
  private routesWithoutNavBar = ['/friends/add', '/create']; // Add routes where you want to hide the nav bar

  constructor(private router: Router, private navService: NavigationService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.hideNavBar = this.routesWithoutNavBar.some((route) =>
          event.urlAfterRedirects.includes(route)
        );
      });

    // Change 'light' to 'light-mode'
    if (localStorage.getItem('theme') == 'light') {
      document.documentElement.classList.add('light-mode');
    }
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
