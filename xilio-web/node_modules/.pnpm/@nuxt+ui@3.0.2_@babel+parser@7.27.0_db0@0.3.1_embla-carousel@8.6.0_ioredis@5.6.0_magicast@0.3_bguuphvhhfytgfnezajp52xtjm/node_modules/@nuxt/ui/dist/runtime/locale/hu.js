import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Magyar",
  code: "hu",
  messages: {
    inputMenu: {
      noMatch: "Nincs tal\xE1lat",
      noData: "Nincs adat",
      create: '"{label}" l\xE9trehoz\xE1sa'
    },
    calendar: {
      prevYear: "El\u0151z\u0151 \xE9v",
      nextYear: "K\xF6vetkez\u0151 \xE9v",
      prevMonth: "El\u0151z\u0151 h\xF3nap",
      nextMonth: "K\xF6vetkez\u0151 h\xF3nap"
    },
    inputNumber: {
      increment: "N\xF6vel",
      decrement: "Cs\xF6kkent"
    },
    commandPalette: {
      placeholder: "\xCDrjon be egy parancsot vagy keressen...",
      noMatch: "Nincs tal\xE1lat",
      noData: "Nincs adat",
      close: "Bez\xE1r\xE1s"
    },
    selectMenu: {
      noMatch: "Nincs tal\xE1lat",
      noData: "Nincs adat",
      create: '"{label}" l\xE9trehoz\xE1sa',
      search: "Keres\xE9s..."
    },
    toast: {
      close: "Bez\xE1r\xE1s"
    },
    carousel: {
      prev: "El\u0151z\u0151",
      next: "K\xF6vetkez\u0151",
      goto: "Ugr\xE1s ide {slide}"
    },
    modal: {
      close: "Bez\xE1r\xE1s"
    },
    slideover: {
      close: "Bez\xE1r\xE1s"
    },
    alert: {
      close: "Bez\xE1r\xE1s"
    },
    table: {
      noData: "Nincs adat"
    }
  }
});
