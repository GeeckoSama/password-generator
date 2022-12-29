import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  createHostFactory,
  SpectatorHost,
  toHaveText,
} from '@ngneat/spectator';
import { PasswordDisplayComponent } from './password-display.component';

@Component({
  selector: 'test',
  template: `<password-display></password-display>`,
})
class TestDefaultComponent {}

@Component({
  selector: 'test',
  template: `<password-display password="MOCK_PASSWORD"></password-display>`,
})
class TestComponent {}

describe('PasswordDisplayComponent (avec TestBed)', () => {
  it('should display a phrase when no password is given', () => {
    TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestDefaultComponent],
    });

    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.autoDetectChanges();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toContain('Cliquez sur le bouton "Générer"');
  });

  it('should display the input message', () => {
    TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestComponent],
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toContain('MOCK_PASSWORD');
  });
});

describe('PasswordDisplayComponent (avec Spectator)', () => {
  let spectator: SpectatorHost<PasswordDisplayComponent>;
  const createComponent = createHostFactory({
    component: PasswordDisplayComponent,
  });

  it('should display a phrase when no password is given', () => {
    spectator = createComponent(`<password-display></password-display>`);
    expect(spectator.query('article')).toHaveText(
      'Cliquez sur le bouton "Générer"'
    );
  });

  it('should display the input message', () => {
    spectator = createComponent(
      `<password-display password="MOCK_PASSWORD"></password-display>`
    );
    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });
});
