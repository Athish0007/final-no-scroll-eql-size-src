import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RightSignInComponent } from './components/right-sign-in/right-sign-in.component';
describe('RightSignInComponent', () => {
  let component: RightSignInComponent;
  let fixture: ComponentFixture<RightSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightSignInComponent],
      imports: [FormsModule] // Add FormsModule to imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sign-in component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Sign In" title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sign-in-title')?.textContent).toContain('Sign In');
  });

  it('should toggle password visibility when checkbox is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const passwordInput = compiled.querySelector('input[type="password"], input[type="text"][placeholder="Password"]') as HTMLInputElement;
    const showPassCheckbox = compiled.querySelector('#showPass') as HTMLInputElement;

    expect(passwordInput.type).toBe('password'); // Initially password type

    showPassCheckbox.click(); // Simulate click
    fixture.detectChanges(); // Update view
    expect(component.showPassword).toBeTrue(); // Check component state
    expect(passwordInput.type).toBe('text'); // Password type should change

    showPassCheckbox.click(); // Click again
    fixture.detectChanges();
    expect(component.showPassword).toBeFalse();
    expect(passwordInput.type).toBe('password');
  });

  it('should call handleSignIn method on form submission', () => {
    spyOn(component, 'handleSignIn'); // Spy on the method
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;

    // Set some dummy values
    component.username = 'testuser';
    component.password = 'testpass';
    fixture.detectChanges();

    form.submit(); // Simulate form submission
    expect(component.handleSignIn).toHaveBeenCalled(); // Check if method was called
  });

  it('should have username and password input fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usernameInput = compiled.querySelector('input[placeholder="Username"]');
    const passwordInput = compiled.querySelector('input[placeholder="Password"]');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
});