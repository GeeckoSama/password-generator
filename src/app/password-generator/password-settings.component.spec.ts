import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Settings } from '../type';
import { PasswordSettingsComponent } from './password-settings.component';

@Component({
  selector: 'test',
  template: `<password-settings
    (settingsChange)="onChange($event)"
  ></password-settings>`,
})
class TestDefaultComponent {
  onChange(settings: Settings) {}
}

@Component({
  selector: 'test',
  template: `<password-settings [settings]="settings"></password-settings>`,
})
class TestInputComponent {
  settings: Settings = {
    length: 35,
    uppercase: true,
    numbers: true,
    symbols: true,
  };
}

describe('PasswordSettingsComponent (avec TestBed)', () => {
  it('should represents settings in the html tags', async () => {
    TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    });
    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const lengthInput = fixture.nativeElement.querySelector('#length');
    const uppercaseInput = fixture.nativeElement.querySelector('#uppercase');
    const numbersInput = fixture.nativeElement.querySelector('#numbers');
    const symbolsInput = fixture.nativeElement.querySelector('#symbols');
    expect(lengthInput.value).toBe('20');
    expect(uppercaseInput.checked).toBeFalse();
    expect(numbersInput.checked).toBeFalse();
    expect(symbolsInput.checked).toBeFalse();
  });

  it('should accept initial settings from the outside', async () => {
    TestBed.configureTestingModule({
      declarations: [TestInputComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    });
    const fixture = TestBed.createComponent(TestInputComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const lengthInput = fixture.nativeElement.querySelector('#length');
    const uppercaseInput = fixture.nativeElement.querySelector('#uppercase');
    const numbersInput = fixture.nativeElement.querySelector('#numbers');
    const symbolsInput = fixture.nativeElement.querySelector('#symbols');
    expect(lengthInput.value).toBe('35');
    expect(uppercaseInput.checked).toBeTrue();
    expect(numbersInput.checked).toBeTrue();
    expect(symbolsInput.checked).toBeTrue();
  });

  it('should emit an event with settings each time user changes HTML inputs', () => {
    TestBed.configureTestingModule({
      declarations: [TestDefaultComponent, PasswordSettingsComponent],
      imports: [FormsModule],
    });
    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.autoDetectChanges();
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'onChange');

    const verifyCheckbox = (
      id: 'uppercase' | 'numbers' | 'symbols',
      expectedValue: Settings
    ) => {
      fixture.nativeElement.querySelector('#' + id).click();
      expect(spy).toHaveBeenCalledWith(expectedValue);
    };

    const lengthInput = fixture.nativeElement.querySelector('#length');
    lengthInput.value = '33';
    lengthInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
    verifyCheckbox('uppercase', {
      length: 33,
      uppercase: true,
      numbers: false,
      symbols: false,
    });
    verifyCheckbox('numbers', {
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: false,
    });
    verifyCheckbox('symbols', {
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
  });
});

describe('PasswordSettingsComponent (avec Spectator)', () => {
  let defaultSpectator: Spectator<TestDefaultComponent>;
  let inputSpectator: Spectator<TestInputComponent>;
  const createDefaultSpectator = createComponentFactory({
    imports: [FormsModule],
    declarations: [PasswordSettingsComponent],
    component: TestDefaultComponent,
  });
  const createInputSpectator = createComponentFactory({
    imports: [FormsModule],
    declarations: [PasswordSettingsComponent],
    component: TestInputComponent,
  });

  it('should represents settings in the html tags', async () => {
    defaultSpectator = createDefaultSpectator();
    await defaultSpectator.fixture.whenStable();
    expect(defaultSpectator.query('#length')).toHaveValue('20');
    expect(defaultSpectator.query('#uppercase')).not.toBeChecked();
    expect(defaultSpectator.query('#numbers')).not.toBeChecked();
    expect(defaultSpectator.query('#symbols')).not.toBeChecked();
  });

  it('should accept initial settings from the outside', async () => {
    inputSpectator = createInputSpectator();
    await inputSpectator.fixture.whenStable();
    expect(inputSpectator.query('#length')).toHaveValue('35');
    expect(inputSpectator.query('#uppercase')).toBeChecked();
    expect(inputSpectator.query('#numbers')).toBeChecked();
    expect(inputSpectator.query('#symbols')).toBeChecked();
  });

  it('should emit an event with settings each time user changes HTML inputs', () => {
    defaultSpectator = createDefaultSpectator();
    const spy = spyOn(defaultSpectator.component, 'onChange');
    defaultSpectator.typeInElement('33', '#length');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
    defaultSpectator.click('#uppercase');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: true,
      numbers: false,
      symbols: false,
    });
    defaultSpectator.click('#numbers');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: false,
    });
    defaultSpectator.click('#symbols');
    expect(spy).toHaveBeenCalledWith({
      length: 33,
      uppercase: true,
      numbers: true,
      symbols: true,
    });
  });
});
