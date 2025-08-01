import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';  // Required for Angular

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));
