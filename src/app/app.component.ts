import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générer un mot de passe fort !</h1>
      <div class="grid">
        <div>
          <h3>Votre futur mot de passe</h3>
          <article>{{ message }}</article>
        </div>
        <div>
          <label for="length">Longueur du mot de passe : {{ length }}</label>
          <input
            type="range"
            name="length"
            id="length"
            min="10"
            max="50"
            (input)="onChangeLength($event)"
          />

          <label for="uppercase">
            <input
              #uppercaseInput
              (change)="
                onChangeSetting(uppercaseInput.name, uppercaseInput.checked)
              "
              role="switch"
              type="checkbox"
              name="uppercase"
              id="uppercase"
            />
            Contiendra des majuscules
          </label>
          <label for="numbers">
            <input
              #numbersInput
              (change)="
                onChangeSetting(numbersInput.name, numbersInput.checked)
              "
              role="switch"
              type="checkbox"
              name="numbers"
              id="numbers"
            />
            Contiendra des nombres
          </label>
          <label for="symbols">
            <input
              #symbolsInput
              (change)="
                onChangeSetting(symbolsInput.name, symbolsInput.checked)
              "
              role="switch"
              type="checkbox"
              name="symbols"
              id="symbols"
            />
            Contiendra des caractères spéciaux
          </label>
          <hr />
          <button (click)="onClickGenerate()">Générer</button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  message = 'Cliquez sur le bouton Générer';

  length = 20;
  uppercase = false;
  numbers = false;
  symbols = false;

  onClickGenerate() {
    this.message = 'MON_MOT_DE_PASSE';
    console.log('Génération du mot de passe avec');
    console.table({
      Length: this.length,
      Uppercase: this.uppercase,
      Numbers: this.numbers,
      Symbols: this.symbols,
    });
  }

  onChangeLength(event: Event) {
    this.length = +(event.target as HTMLInputElement).value;
  }

  onChangeSetting(settingName: string, settingValue: boolean) {
    if (
      settingName !== 'uppercase' &&
      settingName !== 'numbers' &&
      settingName !== 'symbols'
    )
      return;

    this[settingName] = settingValue;
  }
}
