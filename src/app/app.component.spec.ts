import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent (avec spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent],
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
    expect(component.uppercase).toBeTrue();
    

    spectator.click('#numbers');
    expect(component.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.symbols).toBeTrue();

    spectator.typeInElement("33", '#length');
    expect(component.length).toBe(33);
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
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

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MON_MOT_DE_PASSE');
  });

  it('should update settings when user clicks on checkboxes', () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.symbols).toBeTrue();

    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));
    expect(component.length).toBe(33);
  });
});
