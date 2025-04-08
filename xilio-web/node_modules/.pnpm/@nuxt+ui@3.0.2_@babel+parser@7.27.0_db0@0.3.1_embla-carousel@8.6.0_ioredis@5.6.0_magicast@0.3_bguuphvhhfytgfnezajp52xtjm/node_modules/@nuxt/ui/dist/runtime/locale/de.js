import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Deutsch",
  code: "de",
  messages: {
    inputMenu: {
      noMatch: "Nichts gefunden",
      noData: "Keine Daten",
      create: '"{label}" erstellen'
    },
    calendar: {
      prevYear: "Vorheriges Jahr",
      nextYear: "N\xE4chstes Jahr",
      prevMonth: "Vorheriger Monat",
      nextMonth: "N\xE4chster Monat"
    },
    inputNumber: {
      increment: "Erh\xF6hen",
      decrement: "Verringern"
    },
    commandPalette: {
      placeholder: "Geben Sie einen Befehl ein oder suchen Sie...",
      noMatch: "Nichts gefunden",
      noData: "Keine Daten",
      close: "Schlie\xDFen"
    },
    selectMenu: {
      noMatch: "Nichts gefunden",
      noData: "Keine Daten",
      create: '"{label}" erstellen',
      search: "Suchen..."
    },
    toast: {
      close: "Schlie\xDFen"
    },
    carousel: {
      prev: "Zur\xFCck",
      next: "Weiter",
      goto: "Gehe zu {slide}"
    },
    modal: {
      close: "Schlie\xDFen"
    },
    slideover: {
      close: "Schlie\xDFen"
    },
    alert: {
      close: "Schlie\xDFen"
    },
    table: {
      noData: "Keine Daten"
    }
  }
});
