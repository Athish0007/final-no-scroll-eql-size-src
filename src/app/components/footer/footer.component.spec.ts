import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the TN logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tnLogo = compiled.querySelector('.bottom-left-curve .footer-logo.small') as HTMLImageElement;
    expect(tnLogo).toBeTruthy();
    expect(tnLogo.src).toContain('assets/tn_logo.png');
    expect(tnLogo.alt).toContain('TN');
  });

  it('should display the SDM logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sdmLogo = compiled.querySelector('.bottom-left-curve .footer-logo.small.second') as HTMLImageElement;
    expect(sdmLogo).toBeTruthy();
    expect(sdmLogo.src).toContain('assets/sdm_logo.png');
    expect(sdmLogo.alt).toContain('SDM');
  });

  it('should display the RIMES logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rimesLogo = compiled.querySelector('.bottom-right-logo img') as HTMLImageElement;
    expect(rimesLogo).toBeTruthy();
    expect(rimesLogo.src).toContain('assets/rimes_logo.png');
    expect(rimesLogo.alt).toContain('RIMES');
  });

  it('should contain the correct footer text for TN System', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tnText = compiled.querySelector('.bottom-left-curve .footer-text');
    expect(tnText?.textContent).toContain('Tamil Nadu System for Multi‑hazard potential impact');
    expect(tnText?.textContent).toContain('assessment, Alert, Emergency Response Planning and');
    expect(tnText?.textContent).toContain('Tracking');
  });

  it('should contain the correct footer text for RIMES', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rimesText = compiled.querySelector('.bottom-right-logo p');
    expect(rimesText?.textContent).toContain('RIMES Regional Integrated Multi‑Hazard Early');
    expect(rimesText?.textContent).toContain('Warning System (RIMES), Thailand');
    expect(rimesText?.textContent).toContain('Copyright© 2025');
  });
});