import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { PasswordDisplayComponent } from './password-display.component';

@Component({
  selector: 'test',
  template: `<password-display message="MOCK_MESSAGE"></password-display>`,
})
class TestComponent {}

describe('PasswordDisplayComponent (avec TestBed)', () => {
  it('should display the input message', () => {
    TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestComponent],
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toContain('MOCK_MESSAGE');
  });
});

describe('PasswordDisplayComponent (avec Spectator)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;
  const createComponent = createHostFactory({
    component: PasswordDisplayComponent,
  });

  beforeEach(
    () =>
      (spectator = createComponent(
        `<password-display message="MOCK_MESSAGE"></password-display>`
      ))
  );

  it('should display the input message', () => {
    expect(spectator.query('article')).toHaveText('MOCK_MESSAGE');
  });
});
