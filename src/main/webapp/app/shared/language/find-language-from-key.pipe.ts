import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'findLanguageFromKey'})
export class FindLanguageFromKeyPipe implements PipeTransform {
    private languages: any = {
        'ar-ly': { name: 'العربية', rtl: true },
        'hy': { name: 'Հայերեն' },
        'ca': { name: 'Català' },
        'zh-cn': { name: '中文（简体）' },
        'zh-tw': { name: '繁體中文' },
        'cs': { name: 'Český' },
        'da': { name: 'Dansk' },
        'nl': { name: 'Nederlands' },
        'en': { name: 'English' },
        'et': { name: 'Eesti' },
        'fa': { name: 'فارسی', rtl: true },
        'fr': { name: 'Français' },
        'gl': { name: 'Galego' },
        'de': { name: 'Deutsch' },
        'el': { name: 'Ελληνικά' },
        'hi': { name: 'हिंदी' },
        'hu': { name: 'Magyar' },
        'id': { name: 'Bahasa Indonesia' },
        'it': { name: 'Italiano' },
        'ja': { name: '日本語' },
        'ko': { name: '한국어' },
        'mr': { name: 'मराठी' },
        'pl': { name: 'Polski' },
        'pt-br': { name: 'Português (Brasil)' },
        'pt-pt': { name: 'Português' },
        'ro': { name: 'Română' },
        'ru': { name: 'Русский' },
        'sk': { name: 'Slovenský' },
        'sr': { name: 'Srpski' },
        'es': { name: 'Español' },
        'sv': { name: 'Svenska' },
        'tr': { name: 'Türkçe' },
        'ta': { name: 'தமிழ்' },
        'th': { name: 'ไทย' },
        'ua': { name: 'Українська' },
        'vi': { name: 'Tiếng Việt' }
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    };
    transform(lang: string): string {
        return this.languages[lang].name;
    }
    isRTL(lang: string): boolean {
        return this.languages[lang].rtl;
    }
}
