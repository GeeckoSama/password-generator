import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../type';

@Component({
  selector: 'password-settings',
  template: `
    <label for="length">Longueur du mot de passe : {{ settings.length }}</label>
    <input
      [(ngModel)]="settings.length"
      (ngModelChange)="onSettingsChange()"
      type="range"
      name="length"
      id="length"
      min="10"
      max="50"
    />

    <label for="uppercase">
      <input
        [(ngModel)]="settings.uppercase"
        (ngModelChange)="onSettingsChange()"
        role="switch"
        type="checkbox"
        name="uppercase"
        id="uppercase"
      />
      Contiendra des majuscules
    </label>
    <label for="numbers">
      <input
        [(ngModel)]="settings.numbers"
        (ngModelChange)="onSettingsChange()"
        role="switch"
        type="checkbox"
        name="numbers"
        id="numbers"
      />
      Contiendra des nombres
    </label>
    <label for="symbols">
      <input
        [(ngModel)]="settings.symbols"
        (ngModelChange)="onSettingsChange()"
        role="switch"
        type="checkbox"
        name="symbols"
        id="symbols"
      />
      Contiendra des caractères spéciaux
    </label>
  `,
  styles: [],
})
export class PasswordSettingsComponent {
  @Input() settings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  @Output() settingsChange = new EventEmitter<Settings>();

  onSettingsChange() {
    this.settingsChange.emit(this.settings);
  }
}
