import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
    .compileComponents(); // Compiles the component's template and CSS

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance; // Get the component instance
    fixture.detectChanges(); // Detect changes to render the component
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy(); // Check if the component was successfully created
  });

  it('should display "TNSMART" text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Query for the element that contains the "TNSMART" text
    expect(compiled.querySelector('.tnsmart-text')?.textContent).toContain('TNSMART');
  });

  it('should have an "About Us" link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutUsLink = compiled.querySelector('.about-us-text') as HTMLAnchorElement;
    expect(aboutUsLink).toBeTruthy(); // Check if the link exists
    expect(aboutUsLink.textContent).toContain('About Us'); // Check link text
    expect(aboutUsLink.href).toContain('https://example.com'); // Check link href
  });

  it('should display the TNSMART logo image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tnsmartLogo = compiled.querySelector('.tnsmart-logo') as HTMLImageElement;
    expect(tnsmartLogo).toBeTruthy(); // Check if the image element exists
    expect(tnsmartLogo.src).toContain('assets/tnsmart_logo.png'); // Check image source
    expect(tnsmartLogo.alt).toContain('TNSMART'); // Check image alt text
  });
});