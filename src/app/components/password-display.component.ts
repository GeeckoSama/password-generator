import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-display',
  template: `
    <div>
      <h3>Votre futur mot de passe</h3>
      <article>{{ message }}</article>
    </div>
  `,
  styles: [],
})
export class PasswordDisplayComponent {
  @Input() message = ""
}
