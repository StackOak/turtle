import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Svenska",
  code: "sv",
  messages: {
    inputMenu: {
      noMatch: "Inga matchande data",
      noData: "Inga data",
      create: 'Skapa "{label}"'
    },
    calendar: {
      prevYear: "F\xF6reg\xE5ende \xE5r",
      nextYear: "N\xE4sta \xE5r",
      prevMonth: "F\xF6reg\xE5ende m\xE5nad",
      nextMonth: "N\xE4sta m\xE5nad"
    },
    inputNumber: {
      increment: "\xD6ka",
      decrement: "Minska"
    },
    commandPalette: {
      placeholder: "Skriv ett kommando eller s\xF6k...",
      noMatch: "Inga matchande data",
      noData: "Inga data",
      close: "St\xE4ng"
    },
    selectMenu: {
      noMatch: "Inga matchande data",
      noData: "Inga data",
      create: 'Skapa "{label}"',
      search: "S\xF6k..."
    },
    toast: {
      close: "St\xE4ng"
    },
    carousel: {
      prev: "F\xF6reg\xE5ende",
      next: "N\xE4sta",
      goto: "G\xE5 till {slide}"
    },
    modal: {
      close: "St\xE4ng"
    },
    slideover: {
      close: "St\xE4ng"
    },
    alert: {
      close: "St\xE4ng"
    },
    table: {
      noData: "Inga data"
    }
  }
});
