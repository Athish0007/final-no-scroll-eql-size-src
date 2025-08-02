import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  scrollToSignIn(): void {
  const target = document.querySelector('.login-form-container');
  if (!target) return;

  const startPosition = window.scrollY;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 800; // Duration in ms (increase for slower, smoother scroll)
  let startTime: number | null = null;

  const easeInOutQuad = (t: number): number => {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  };

  const animation = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
    window.scrollTo(0, run);

    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
}

}
