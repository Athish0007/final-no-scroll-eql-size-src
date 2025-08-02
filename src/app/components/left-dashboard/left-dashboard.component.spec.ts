import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LeftDashboardComponent } from './left-dashboard.component';
import { By } from '@angular/platform-browser'; // Import By for querying

describe('LeftDashboardComponent', () => {
  let component: LeftDashboardComponent;
  let fixture: ComponentFixture<LeftDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection to trigger ngAfterViewInit
  });

  it('should create the left dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Rainfall" and "Heatwave" sections initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // We expect the first info-row to be visible and contain these
    const firstInfoRow = compiled.querySelector('.slider-wrapper .info-row:nth-child(1)');
    expect(firstInfoRow?.querySelector('.info-box h3')?.textContent).toContain('Rainfall');
    const heatwaveBox = firstInfoRow?.querySelectorAll('.info-box')[1];
    expect(heatwaveBox?.querySelector('h3')?.textContent).toContain('Heatwave');
  });

  it('should display "Latest" and "More Info" sections initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // We expect the second info-row to be visible initially in desktop view
    const secondInfoRow = compiled.querySelector('.slider-wrapper .info-row:nth-child(2)');
    const latestBox = secondInfoRow?.querySelector('.latest-box h3');
    expect(latestBox?.textContent).toContain('Latest');
    const moreInfoBox = secondInfoRow?.querySelectorAll('.info-box')[1];
    expect(moreInfoBox?.querySelector('h3')?.textContent).toContain('More Info');
  });

  it('should have rainfall data with badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rainfallBox = compiled.querySelector('.info-box');
    expect(rainfallBox?.querySelectorAll('li').length).toBeGreaterThan(0);
    expect(rainfallBox?.querySelector('.badge.rainfall')).toBeTruthy();
  });

  // Optional: Test slider functionality (more advanced)
  it('should slide to the next set of boxes when next button is clicked (desktop)', fakeAsync(() => {
    // Simulate desktop view
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize')); // Trigger resize to set desktop view logic
    fixture.detectChanges(); // Update component based on resize
    tick(); // Allow for async operations like HostListener

    const initialTransform = component.sliderWrapper.nativeElement.style.transform;
    expect(initialTransform).toBe('translateX(-0%)'); // Should be at the start

    const nextButton = fixture.debugElement.query(By.css('.slider-button.next')).nativeElement;
    nextButton.click();
    fixture.detectChanges();
    tick(500); // Wait for the transition duration

    const newTransform = component.sliderWrapper.nativeElement.style.transform;
    // Expecting 100 / 2 = 50% slide for the next set of 2 info-rows
    expect(newTransform).toBe('translateX(-50%)');
  }));

  it('should slide to the next single box when next button is clicked (mobile)', fakeAsync(() => {
    // Simulate mobile view
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 400 });
    window.dispatchEvent(new Event('resize')); // Trigger resize to set mobile view logic
    fixture.detectChanges(); // Update component based on resize
    tick(); // Allow for async operations like HostListener

    const initialTransform = component.sliderWrapper.nativeElement.style.transform;
    expect(initialTransform).toBe('translateX(-0px)'); // Should be at the start

    const nextButton = fixture.debugElement.query(By.css('.slider-button.next')).nativeElement;
    nextButton.click();
    fixture.detectChanges();
    tick(500); // Wait for the transition duration

    const firstInfoBox = component.sliderWrapper.nativeElement.querySelector('.info-box') as HTMLElement;
    const boxWidth = firstInfoBox.offsetWidth + parseFloat(getComputedStyle(firstInfoBox).marginLeft) + parseFloat(getComputedStyle(firstInfoBox).marginRight);

    const newTransform = component.sliderWrapper.nativeElement.style.transform;
    expect(newTransform).toBe(`translateX(-${boxWidth}px)`);
  }));
});