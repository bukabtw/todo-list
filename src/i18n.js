import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import en from './locales/en.json'

function getDefaultLocale() {
  const saved = localStorage.getItem('app-locale')
  if (saved && ['ru', 'en'].includes(saved)) return saved
  const browserLang = navigator.language.split('-')[0]
  return ['ru', 'en'].includes(browserLang) ? browserLang : 'ru'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'ru',
  messages: { ru, en },
  datetimeFormats: {
    ru: {
      short: { year: 'numeric', month: 'long', day: 'numeric' }
    },
    en: {
      short: { year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  numberFormats: {
    ru: {
      currency: { style: 'currency', currency: 'RUB' }
    },
    en: {
      currency: { style: 'currency', currency: 'USD' }
    }
  }
})

export default i18n
