import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Polski",
  code: "pl",
  messages: {
    inputMenu: {
      noMatch: "Brak pasuj\u0105cych danych",
      noData: "Brak danych",
      create: 'Utw\xF3rz "{label}"'
    },
    calendar: {
      prevYear: "Poprzedni rok",
      nextYear: "Przysz\u0142y rok",
      prevMonth: "Poprzedni miesi\u0105c",
      nextMonth: "Przysz\u0142y miesi\u0105c"
    },
    inputNumber: {
      increment: "Zwi\u0119ksz",
      decrement: "Zmniejsz"
    },
    commandPalette: {
      placeholder: "Wpisz polecenie lub wyszukaj...",
      noMatch: "Brak pasuj\u0105cych danych",
      noData: "Brak danych",
      close: "Zamknij"
    },
    selectMenu: {
      noMatch: "Brak pasuj\u0105cych danych",
      noData: "Brak danych",
      create: 'Utw\xF3rz "{label}"',
      search: "Szukaj..."
    },
    toast: {
      close: "Zamknij"
    },
    carousel: {
      prev: "Poprzedni",
      next: "Nast\u0119pny",
      goto: "Id\u017A do {slide}"
    },
    modal: {
      close: "Zamknij"
    },
    slideover: {
      close: "Zamknij"
    },
    alert: {
      close: "Zamknij"
    },
    table: {
      noData: "Brak danych"
    }
  }
});
