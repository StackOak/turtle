import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Fran\xE7ais",
  code: "fr",
  messages: {
    inputMenu: {
      noMatch: "Aucune donn\xE9e correspondante",
      noData: "Aucune donn\xE9e",
      create: 'Cr\xE9er "{label}"'
    },
    calendar: {
      prevYear: "Ann\xE9e pr\xE9c\xE9dente",
      nextYear: "Ann\xE9e suivante",
      prevMonth: "Mois pr\xE9c\xE9dent",
      nextMonth: "Mois suivant"
    },
    inputNumber: {
      increment: "Augmenter",
      decrement: "Diminuer"
    },
    commandPalette: {
      placeholder: "Tapez une commande ou recherchez...",
      noMatch: "Aucune donn\xE9e correspondante",
      noData: "Aucune donn\xE9e",
      close: "Fermer"
    },
    selectMenu: {
      noMatch: "Aucune donn\xE9e correspondante",
      noData: "Aucune donn\xE9e",
      create: 'Cr\xE9er "{label}"',
      search: "Rechercher..."
    },
    toast: {
      close: "Fermer"
    },
    carousel: {
      prev: "Pr\xE9c\xE9dent",
      next: "Suivant",
      goto: "Aller \xE0 {slide}"
    },
    modal: {
      close: "Fermer"
    },
    slideover: {
      close: "Fermer"
    },
    alert: {
      close: "Fermer"
    },
    table: {
      noData: "Aucune donn\xE9e"
    }
  }
});
