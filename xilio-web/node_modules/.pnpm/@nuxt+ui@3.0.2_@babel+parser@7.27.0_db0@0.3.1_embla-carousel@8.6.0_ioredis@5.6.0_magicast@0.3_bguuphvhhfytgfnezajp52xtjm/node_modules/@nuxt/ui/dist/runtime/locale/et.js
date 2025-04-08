import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Eesti",
  code: "et",
  messages: {
    inputMenu: {
      noMatch: "Pole vastavaid andmeid",
      noData: "Pole andmeid",
      create: 'Loo "{label}"'
    },
    calendar: {
      prevYear: "Eelmine aasta",
      nextYear: "J\xE4rgmine aasta",
      prevMonth: "Eelmine kuu",
      nextMonth: "J\xE4rgmine kuu"
    },
    inputNumber: {
      increment: "Suurenda",
      decrement: "V\xE4henda"
    },
    commandPalette: {
      placeholder: "Sisesta k\xE4sk v\xF5i otsi...",
      noMatch: "Pole vastavaid andmeid",
      noData: "Pole andmeid",
      close: "Sulge"
    },
    selectMenu: {
      noMatch: "Pole vastavaid andmeid",
      noData: "Pole andmeid",
      create: 'Loo "{label}"',
      search: "Otsi..."
    },
    toast: {
      close: "Sulge"
    },
    carousel: {
      prev: "Eel",
      next: "J\xE4rg",
      goto: "Mine slaidile {slide}"
    },
    modal: {
      close: "Sulge"
    },
    slideover: {
      close: "Sulge"
    },
    alert: {
      close: "Sulge"
    },
    table: {
      noData: "Pole andmeid"
    }
  }
});
