import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router) {
    // Track navigation history
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.history.push(this.router.url);
      }
    });
  }

  goBack(): void {
    if (this.history.length > 0) {
      this.history.pop();
      const previousUrl = this.history.pop() || '/';
      this.router.navigate([previousUrl]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
