import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Sloven\u010Dina",
  code: "sk",
  messages: {
    inputMenu: {
      noMatch: "\u017Diadna zhoda",
      noData: "\u017Diadne d\xE1ta",
      create: 'Vytvori\u0165 "{label}"'
    },
    calendar: {
      prevYear: "Predch\xE1dzaj\xFAci rok",
      nextYear: "Nasleduj\xFAci rok",
      prevMonth: "Predch\xE1dzaj\xFAci mesiac",
      nextMonth: "Nasleduj\xFAci mesiac"
    },
    inputNumber: {
      increment: "Zv\xFD\u0161i\u0165",
      decrement: "Zn\xED\u017Ei\u0165"
    },
    commandPalette: {
      placeholder: "Zadajte pr\xEDkaz alebo vyh\u013Eadajte...",
      noMatch: "\u017Diadna zhoda",
      noData: "\u017Diadne d\xE1ta",
      close: "Zatvori\u0165"
    },
    selectMenu: {
      noMatch: "\u017Diadna zhoda",
      noData: "\u017Diadne d\xE1ta",
      create: 'Vytvori\u0165 "{label}"',
      search: "H\u013Eada\u0165..."
    },
    toast: {
      close: "Zatvori\u0165"
    },
    carousel: {
      prev: "Predch\xE1dzaj\xFAci",
      next: "Nasleduj\xFAci",
      goto: "Prejs\u0165 na {slide}"
    },
    modal: {
      close: "Zatvori\u0165"
    },
    slideover: {
      close: "Zatvori\u0165"
    },
    alert: {
      close: "Zatvori\u0165"
    },
    table: {
      noData: "\u017Diadne d\xE1ta"
    }
  }
});
