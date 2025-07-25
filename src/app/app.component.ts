import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftDashboardComponent } from './components/left-dashboard/left-dashboard.component';
import { RightSignInComponent } from './components/right-sign-in/right-sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    LeftDashboardComponent,
    RightSignInComponent
  ]
})
export class AppComponent {}
