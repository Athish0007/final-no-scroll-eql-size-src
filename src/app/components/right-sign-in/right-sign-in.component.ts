import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-right-sign-in',
  standalone: true,
  templateUrl: './right-sign-in.component.html',
  styleUrls: ['./right-sign-in.component.css'],
  imports: [FormsModule, CommonModule]
})
export class RightSignInComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  // Inject the Router service into the constructor
  constructor(private router: Router) { }

  handleSignIn(): void {
    console.log('Sign-in attempt:', {
      username: this.username,
      password: this.password
    });

    // In a real application, you would perform authentication (e.g., API call) here.
    // For now, we'll simulate a successful login and redirect.
    if (this.username && this.password) {
      // Redirect to your sample page.
      // Replace '/sample-page' with the actual path to your desired page.
      this.router.navigate(['/dashboard']); // Assuming '/dashboard' is your sample page route
    } else {
      alert('Please enter both username and password.');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}