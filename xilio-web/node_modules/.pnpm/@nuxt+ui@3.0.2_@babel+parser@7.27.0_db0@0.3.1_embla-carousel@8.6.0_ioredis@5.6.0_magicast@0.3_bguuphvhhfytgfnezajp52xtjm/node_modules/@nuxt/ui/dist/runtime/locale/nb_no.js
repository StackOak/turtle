import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Norsk Bokm\xE5l",
  code: "nb-NO",
  messages: {
    inputMenu: {
      noMatch: "Ingen samsvarende data",
      noData: "Ingen data",
      create: 'Opprett "{label}"'
    },
    calendar: {
      prevYear: "Forrige \xE5r",
      nextYear: "Neste \xE5r",
      prevMonth: "Forrige m\xE5ned",
      nextMonth: "Neste m\xE5ned"
    },
    inputNumber: {
      increment: "\xD8k",
      decrement: "Reduser"
    },
    commandPalette: {
      placeholder: "Skriv inn en kommando eller s\xF8k...",
      noMatch: "Ingen samsvarende data",
      noData: "Ingen data",
      close: "Lukk"
    },
    selectMenu: {
      noMatch: "Ingen samsvarende data",
      noData: "Ingen data",
      create: 'Opprett "{label}"',
      search: "S\xF8k..."
    },
    toast: {
      close: "Lukk"
    },
    carousel: {
      prev: "Forrige",
      next: "Neste",
      goto: "G\xE5 til lysbilde {slide}"
    },
    modal: {
      close: "Lukk"
    },
    slideover: {
      close: "Lukk"
    },
    alert: {
      close: "Lukk"
    },
    table: {
      noData: "Ingen data"
    }
  }
});
