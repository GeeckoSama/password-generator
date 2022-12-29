import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'password-controls',
  template: ` <button (click)="generate.emit()">Générer</button> `,
  styles: [],
})
export class PasswordControlsComponent {
  @Output() generate = new EventEmitter();
}
