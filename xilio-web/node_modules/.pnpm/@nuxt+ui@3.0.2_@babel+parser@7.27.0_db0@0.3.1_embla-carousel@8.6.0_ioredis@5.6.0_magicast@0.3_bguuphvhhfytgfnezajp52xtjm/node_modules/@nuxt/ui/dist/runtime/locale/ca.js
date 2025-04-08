import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Catal\xE0",
  code: "ca",
  messages: {
    inputMenu: {
      noMatch: "No hi ha dades coincidents",
      noData: "Sense dades",
      create: 'Crear "{label}"'
    },
    calendar: {
      prevYear: "Any anterior",
      nextYear: "Any seg\xFCent",
      prevMonth: "Mes anterior",
      nextMonth: "Mes seg\xFCent"
    },
    inputNumber: {
      increment: "Incrementar",
      decrement: "Decrementar"
    },
    commandPalette: {
      placeholder: "Escriu una ordre o cerca...",
      noMatch: "No hi ha dades coincidents",
      noData: "Sense dades",
      close: "Tancar"
    },
    selectMenu: {
      noMatch: "No hi ha dades coincidents",
      noData: "Sense dades",
      create: 'Crear "{label}"',
      search: "Cerca..."
    },
    toast: {
      close: "Tancar"
    },
    carousel: {
      prev: "Anterior",
      next: "Seg\xFCent",
      goto: "Anar a la diapositiva {slide}"
    },
    modal: {
      close: "Tancar"
    },
    slideover: {
      close: "Tancar"
    },
    alert: {
      close: "Tancar"
    },
    table: {
      noData: "Sense dades"
    }
  }
});
