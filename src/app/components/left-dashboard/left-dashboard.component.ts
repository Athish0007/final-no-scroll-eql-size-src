import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-left-dashboard',
  templateUrl: './left-dashboard.component.html',
  styleUrls: ['./left-dashboard.component.css']
})
export class LeftDashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>; // Added for direct access to container width

  currentIndex: number = 0; // On desktop, this will be the index of the *slide-page*. On mobile, the *info-box*.
  itemsPerView: number = 0; // Number of primary slide units visible (1 slide-page for desktop, 1 info-box for mobile)

  // Array to hold all individual info-box elements (used primarily for mobile sliding)
  allSliderBoxes: HTMLElement[] = [];

  // Array to hold all slide-page elements (used primarily for desktop sliding)
  allSlidePages: HTMLElement[] = [];

  // Touch event properties
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchThreshold: number = 50; // Minimum pixel distance for a swipe

  constructor() { }

  ngAfterViewInit(): void {
    // Populate all info-boxes (flattened list) for mobile calculations and general reference
    this.allSliderBoxes = Array.from(this.sliderWrapper.nativeElement.querySelectorAll('.info-box')) as HTMLElement[];

    // Populate all slide-pages for desktop calculations
    this.allSlidePages = Array.from(this.sliderWrapper.nativeElement.querySelectorAll('.slide-page')) as HTMLElement[];

    // Initial setup
    this.updateSliderPosition();

    // Add touch event listeners dynamically
    this.sliderWrapper.nativeElement.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.sliderWrapper.nativeElement.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.sliderWrapper.nativeElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up event listeners to prevent memory leaks
    if (this.sliderWrapper && this.sliderWrapper.nativeElement) {
      this.sliderWrapper.nativeElement.removeEventListener('touchstart', this.handleTouchStart.bind(this));
      this.sliderWrapper.nativeElement.removeEventListener('touchmove', this.handleTouchMove.bind(this));
      this.sliderWrapper.nativeElement.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    }
  }

  // Listen for window resize events to adjust slider
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.currentIndex = 0; // Reset index on resize to prevent issues
    this.updateSliderPosition();
  }

  updateSliderPosition(): void {
    if (!this.sliderWrapper) {
      return; // Ensure elements are loaded
    }

    if (window.innerWidth > 768) { // Laptop view: 2x2 grid visible (1 slide-page)
      this.itemsPerView = 1; // One slide-page is visible at a time

      if (this.allSlidePages.length === 0) return;

      const maxPageIndex = this.allSlidePages.length - this.itemsPerView;
      this.currentIndex = Math.min(this.currentIndex, Math.max(0, maxPageIndex));

      // Each slide-page takes 100% of the slider-container's width
      const transformValue = this.currentIndex * 100;
      this.sliderWrapper.nativeElement.style.transform = `translateX(-${transformValue}%)`;

    } else { // Mobile view: 1 box visible
      this.itemsPerView = 1; // Display 1 info-box at a time

      if (this.allSliderBoxes.length === 0) return;

      const maxBoxIndex = this.allSliderBoxes.length - this.itemsPerView;
      this.currentIndex = Math.min(this.currentIndex, Math.max(0, maxBoxIndex));

      // --- CRUCIAL CHANGE FOR MOBILE SLIDE CALCULATION ---
      // Get the width of the first info-box, including its computed margins
      let slideUnitWidth = 0;
      if (this.allSliderBoxes[0]) {
        const firstBox = this.allSliderBoxes[0];
        const computedStyle = getComputedStyle(firstBox);
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const marginRight = parseFloat(computedStyle.marginRight);

        // This is the accurate width of a single slide item as seen on screen
        slideUnitWidth = firstBox.offsetWidth + marginLeft + marginRight;
      }

      const totalOffset = this.currentIndex * slideUnitWidth;
      this.sliderWrapper.nativeElement.style.transform = `translateX(-${totalOffset}px)`;
    }
  }

  showNext(): void {
    if (window.innerWidth > 768) { // Desktop view: slide to the next slide-page
        if (this.allSlidePages.length === 0) return;
        const totalPages = this.allSlidePages.length;

        if (this.currentIndex < totalPages - this.itemsPerView) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to the start
        }
    } else { // Mobile view: slide by 1 box
        if (this.allSliderBoxes.length === 0) return;
        const totalBoxes = this.allSliderBoxes.length;
        if (this.currentIndex < totalBoxes - this.itemsPerView) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to the start
        }
    }
    this.updateSliderPosition();
  }

  showPrev(): void {
    if (window.innerWidth > 768) { // Desktop view: slide to the previous slide-page
        if (this.allSlidePages.length === 0) return;
        const totalPages = this.allSlidePages.length;

        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = totalPages - this.itemsPerView; // Loop to the end
        }
    } else { // Mobile view: slide by 1 box
        if (this.allSliderBoxes.length === 0) return;
        const totalBoxes = this.allSliderBoxes.length;
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = totalBoxes - this.itemsPerView; // Loop to the end
        }
    }
    this.updateSliderPosition();
  }

  // --- Touch Event Handlers --- (Unchanged)
  handleTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.sliderWrapper.nativeElement.style.transition = 'none'; // Disable transition during touch
  }

  handleTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
  }

  handleTouchEnd(event: TouchEvent): void {
    this.sliderWrapper.nativeElement.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition

    const deltaX = this.touchEndX - this.touchStartX;

    if (Math.abs(deltaX) > this.touchThreshold) { // Check if it's a significant swipe
      if (deltaX > 0) {
        // Swiped right (previous)
        this.showPrev();
      } else {
        // Swiped left (next)
        this.showNext();
      }
    }

    // Reset touch coordinates
    this.touchStartX = 0;
    this.touchEndX = 0;
  }
}
