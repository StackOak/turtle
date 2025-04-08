import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "T\xFCrk\xE7e",
  code: "tr",
  messages: {
    inputMenu: {
      noMatch: "E\u015Fle\u015Fen veri yok",
      noData: "Veri yok",
      create: '"{label}" olu\u015Ftur'
    },
    calendar: {
      prevYear: "\xD6nceki y\u0131l",
      nextYear: "Sonraki y\u0131l",
      prevMonth: "\xD6nceki ay",
      nextMonth: "Sonraki ay"
    },
    inputNumber: {
      increment: "Artt\u0131r",
      decrement: "Azalt"
    },
    commandPalette: {
      placeholder: "Bir komut yaz\u0131n veya arama yap\u0131n...",
      noMatch: "E\u015Fle\u015Fen veri yok",
      noData: "Veri yok",
      close: "Kapat"
    },
    selectMenu: {
      noMatch: "E\u015Fle\u015Fen veri yok",
      noData: "Veri yok",
      create: '"{label}" olu\u015Ftur',
      search: "Ara..."
    },
    toast: {
      close: "Kapat"
    },
    carousel: {
      prev: "\xD6nceki",
      next: "Sonraki",
      goto: "{slide}. slayda git"
    },
    modal: {
      close: "Kapat"
    },
    slideover: {
      close: "Kapat"
    },
    alert: {
      close: "Kapat"
    },
    table: {
      noData: "Veri yok"
    }
  }
});
