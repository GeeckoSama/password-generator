import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'password-controls',
  template: `
    <button (click)="generate.emit()" id="generate">Générer</button>
    <button *ngIf="password" (click)="onClickCopy()" id="copy">
      Copier le mot de passe
    </button>
    <span *ngIf="hasBeenCopied" id="copyText"
      >Mot de passe copié dans le presse papier</span
    >
  `,
  styles: [],
})
export class PasswordControlsComponent {
  @Input() password?: string;
  @Output() generate = new EventEmitter();
  hasBeenCopied = false;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['password']) {
      return;
    }

    this.hasBeenCopied = false;
  }

  onClickCopy() {
    if (this.password) {
      navigator.clipboard.writeText(this.password);
      this.hasBeenCopied = true;
    }
  }
}
