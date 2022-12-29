import { Component } from '@angular/core';
import { PasswordGeneratorService } from './password-generator/password-generator.service';
import { Settings } from './type';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générer un mot de passe fort !</h1>
      <div class="grid">
        <password-display [password]="password"></password-display>
        <div>
          <password-settings
            [settings]="settingsCopy"
            (settingsChange)="onChangeSettings($event)"
          ></password-settings>
          <hr />
          <password-controls
            [password]="password"
            (generate)="onClickGenerate()"
          ></password-controls>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  password?: string;

  settings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  get settingsCopy() {
    return { ...this.settings };
  }

  constructor(private service: PasswordGeneratorService) {}

  onChangeSettings(obj: Settings) {
    this.settings = obj;
  }

  onClickGenerate() {
    this.password = this.service.generate(this.settings);
  }
}
