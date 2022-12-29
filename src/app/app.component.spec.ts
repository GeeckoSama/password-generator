import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FormsModule } from '@angular/forms';
import { PasswordDisplayComponent } from './components/password-display.component';
import { PasswordControlsComponent } from './components/password-controls.component';
import { PasswordSettingsComponent } from './components/password-settings.component';

describe('AppComponent (avec spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      AppComponent,
      PasswordDisplayComponent,
      PasswordControlsComponent,
      PasswordSettingsComponent,
    ],
    imports: [FormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should work', () => {
    expect(spectator.query('article')?.textContent).toBe(
      'Cliquez sur le bouton Générer'
    );
  });

  it('should change message when user clicks generate button', () => {
    spectator.click('button');
    expect(spectator.query('article')).toHaveText('MON_MOT_DE_PASSE');
  });

  it('should update settings when user clicks on checkboxes', () => {
    spectator.click('#uppercase');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.settings.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.settings.symbols).toBeTrue();

    spectator.typeInElement('33', '#length');
    expect(component.settings.length).toBe(33);
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PasswordDisplayComponent,
        PasswordControlsComponent,
        PasswordSettingsComponent,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  });
  it('should work', () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton Générer');
  });

  it('should change message when user clicks generate button', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MON_MOT_DE_PASSE');
  });

  it('should update settings when user clicks on checkboxes', () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.settings.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.settings.symbols).toBeTrue();

    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));
    expect(component.settings.length).toBe(33);
  });
});
