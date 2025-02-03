import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  imports: [CommonModule, NzIconModule,IonRouterOutlet,RouterLink],
})
export class ContentLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
