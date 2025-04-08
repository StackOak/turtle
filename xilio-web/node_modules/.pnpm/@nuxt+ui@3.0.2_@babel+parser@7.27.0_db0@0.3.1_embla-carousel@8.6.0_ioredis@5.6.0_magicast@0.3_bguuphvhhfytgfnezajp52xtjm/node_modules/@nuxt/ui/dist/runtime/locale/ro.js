import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Rom\xE2n\u0103",
  code: "ro",
  messages: {
    inputMenu: {
      noMatch: "Nu exist\u0103 date corespunz\u0103toare",
      noData: "Nu exist\u0103 date",
      create: 'Creeaz\u0103 "{label}"'
    },
    calendar: {
      prevYear: "Anul precedent",
      nextYear: "Anul urm\u0103tor",
      prevMonth: "Luna precedent\u0103",
      nextMonth: "Luna urm\u0103toare"
    },
    inputNumber: {
      increment: "Cre\u0219te",
      decrement: "Scade"
    },
    commandPalette: {
      placeholder: "Tasteaz\u0103 o comand\u0103 sau caut\u0103...",
      noMatch: "Nu exist\u0103 date corespunz\u0103toare",
      noData: "Nu exist\u0103 date",
      close: "\xCEnchide"
    },
    selectMenu: {
      noMatch: "Nu exist\u0103 date corespunz\u0103toare",
      noData: "Nu exist\u0103 date",
      create: 'Creeaz\u0103 "{label}"',
      search: "Caut\u0103..."
    },
    toast: {
      close: "\xCEnchide"
    },
    carousel: {
      prev: "Anterior",
      next: "Urm\u0103tor",
      goto: "Mergi la diapozitivul {slide}"
    },
    modal: {
      close: "\xCEnchide"
    },
    slideover: {
      close: "\xCEnchide"
    },
    alert: {
      close: "\xCEnchide"
    },
    table: {
      noData: "Nu exist\u0103 date"
    }
  }
});
