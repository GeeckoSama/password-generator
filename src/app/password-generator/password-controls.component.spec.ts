import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { PasswordControlsComponent } from './password-controls.component';

@Component({
  selector: 'test',
  template: `<password-controls
    [password]="password"
    (generate)="onGenerate()"
  ></password-controls>`,
})
class TestComponent {
  password?: string;
  onGenerate() {}
}

describe('PasswordControlsComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordControlsComponent, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should emit an event when user clicks the button', () => {
    const spy = spyOn(component, 'onGenerate');
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not show copy button', () => {
    expect(fixture.nativeElement.querySelector('#copy')).toBeNull();
  });

  it('should show copy button if password has been generated', () => {
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
  });

  it('should copy the password when the user click the copy button', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#copy').click();
    expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');
    expect(fixture.nativeElement.querySelector('#copyText').textContent).toBe(
      'Mot de passe copié dans le presse papier'
    );
  });

  it('should make the message disappear if a new password is generated', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('#copy').click();
    fixture.componentInstance.password = 'NEW_MOCK_PASSWORD';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#copyText')).toBeNull();
    fixture.nativeElement.querySelector('#copy').click();
    expect(fixture.nativeElement.querySelector('#copyText')).toBeTruthy();
  });
});

describe('PasswordControlsComponent (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should emit an event when user clicks the button', () => {
    const spy = spyOn(spectator.component, 'onGenerate');
    spectator.click('#generate');
    expect(spy).toHaveBeenCalled();
  });

  it('should not show copy button', () => {
    expect(spectator.query('#copy')).toBeNull();
  });

  it('should show copy button if password has been generated', () => {
    spectator.setInput('password', 'MOCK_PASSWORD');
    expect(spectator.query('#copy')).toBeTruthy();
  });

  it('should copy the password when the user click the copy button', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    spectator.setInput('password', 'MOCK_PASSWORD');
    spectator.click('#copy');
    expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');
    expect(spectator.query('#copyText')).toHaveText(
      'Mot de passe copié dans le presse papier'
    );
  });

  it('should make the message disappear if a new password is generated', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    spectator.setInput('password', 'MOCK_PASSWORD');
    spectator.click('#copy');
    spectator.setInput('password', 'NEW_MOCK_PASSWORD');
    expect(spectator.query('#copyText')).toBeNull();
    spectator.click('#copy');
    expect(spectator.query('#copyText')).toExist();
  });
});
