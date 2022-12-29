import * as Generator from 'generate-password-browser';
import { Settings } from '../type';

export class PasswordGeneratorService {
  generate(settings: Settings) {
    return Generator.generate(settings);
  }
}
