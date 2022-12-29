import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordControlsComponent } from './password-controls.component';
import { PasswordDisplayComponent } from './password-display.component';
import { PasswordGeneratorService } from './password-generator.service';
import { PasswordSettingsComponent } from './password-settings.component';

@NgModule({
  declarations: [
    PasswordDisplayComponent,
    PasswordControlsComponent,
    PasswordSettingsComponent,
  ],
  imports: [CommonModule, FormsModule],
  providers: [PasswordGeneratorService],
  exports: [
    PasswordDisplayComponent,
    PasswordControlsComponent,
    PasswordSettingsComponent,
  ],
})
export class PasswordGeneratorModule {}
