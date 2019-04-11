import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from 'app/shared/translation/translations';

@Injectable()
export class TranslationService {
  private _currentLang: string;

  public get currentLang() { return this._currentLang; }
  // inject our translations
  constructor(@Inject(TRANSLATIONS) private _translations: any) { }

  public use(lang: string): void {
    // set current language
    // tslint:disable-next-line:indent
    this._currentLang = lang;
  }

  public translate(key: string): string {
    // private perform translation
    const translation = key;

    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }
    return translation;
  }

  public instant(key: string) {
    // public perform translation
    return this.translate(key);
  }
}
