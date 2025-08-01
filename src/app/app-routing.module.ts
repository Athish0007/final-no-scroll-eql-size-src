// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define your application routes here.
// Based on the project description, all content (Header, Left Body,
// Right Body, Footer) is displayed on a single page, adapting responsively.
// Therefore, we don't need to define explicit routes for separate "pages" yet.
// The 'routes' array can remain empty, or you could set up a default route
// if you had a specific "landing page" component that wasn't app.component itself.

const routes: Routes = [
  // Example of how you would add routes if your application expands to multiple pages:
  // { path: '', component: YourDefaultPageComponent }, // e.g., a login page
  // { path: 'dashboard', component: DashboardViewComponent },
  // { path: 'profile', component: UserProfileComponent },
  // { path: '**', redirectTo: '' } // Wildcard route for any unmatched URL, redirecting to default
];

@NgModule({
  // RouterModule.forRoot(routes) is used to configure the router at the root level.
  // It provides all the necessary router services and directives for the application.
  imports: [RouterModule.forRoot(routes)],

  // We export RouterModule to make router directives (like routerLink, routerOutlet)
  // available to any component in other modules that import AppRoutingModule.
  exports: [RouterModule]
})
export class AppRoutingModule { }