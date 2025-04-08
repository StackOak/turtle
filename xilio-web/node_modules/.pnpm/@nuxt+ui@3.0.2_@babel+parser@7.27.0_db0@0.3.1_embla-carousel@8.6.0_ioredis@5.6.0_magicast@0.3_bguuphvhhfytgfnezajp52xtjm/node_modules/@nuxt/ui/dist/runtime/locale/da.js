import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Danish",
  code: "da",
  messages: {
    inputMenu: {
      noMatch: "Ingen matchende data",
      noData: "Ingen data",
      create: 'Opret "{label}"'
    },
    calendar: {
      prevYear: "Forrige \xE5r",
      nextYear: "N\xE6ste \xE5r",
      prevMonth: "Forrige m\xE5ned",
      nextMonth: "N\xE6ste m\xE5ned"
    },
    inputNumber: {
      increment: "\xD8g",
      decrement: "Reducer"
    },
    commandPalette: {
      placeholder: "Skriv en kommando eller s\xF8g...",
      noMatch: "Ingen matchende data",
      noData: "Ingen data",
      close: "Luk"
    },
    selectMenu: {
      noMatch: "Ingen matchende data",
      noData: "Ingen data",
      create: 'Opret "{label}"',
      search: "S\xF8g..."
    },
    toast: {
      close: "Luk"
    },
    carousel: {
      prev: "Forrige",
      next: "N\xE6ste",
      goto: "G\xE5 til slide {slide}"
    },
    modal: {
      close: "Luk"
    },
    slideover: {
      close: "Luk"
    },
    alert: {
      close: "Luk"
    },
    table: {
      noData: "Ingen data"
    }
  }
});
