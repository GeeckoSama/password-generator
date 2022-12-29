import { Component } from '@angular/core';
import { Settings } from './type';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générer un mot de passe fort !</h1>
      <div class="grid">
        <password-display [message]="message"></password-display>
        <div>
          <password-settings
            [settings]="settingsCopy"
            (settingsChange)="onChangeSettings($event)"
          ></password-settings>
          <hr />
          <password-controls (generate)="onClickGenerate()"></password-controls>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  message = 'Cliquez sur le bouton Générer';

  settings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  get settingsCopy() {
    return { ...this.settings };
  }

  onChangeSettings(obj: Settings) {
    this.settings = obj;
  }

  onClickGenerate() {
    this.message = 'MON_MOT_DE_PASSE';
    console.log('Génération du mot de passe avec');
    console.table(this.settings);
  }
}
