import * as ru_lang from '../langs/ru.json'
import * as en_lang from '../langs/en.json'
import { LangJSON} from "../interfaces.ts";

export function useTranslation(lang: string) {
  const ruLangData: LangJSON = ru_lang
  const enLangData: LangJSON = en_lang
  function t(value: string) {
    switch (lang) {
      case 'ru':
        return ruLangData[value]
      case 'en':
        return enLangData[value]
    }
  }
  return { t }
}
