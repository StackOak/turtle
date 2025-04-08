import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Hebrew",
  code: "he",
  dir: "rtl",
  messages: {
    inputMenu: {
      noMatch: "\u05D0\u05D9\u05DF \u05D4\u05EA\u05D0\u05DE\u05D4",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      create: '\u05E6\u05D5\u05E8 "{label}"'
    },
    calendar: {
      prevYear: "\u05E9\u05E0\u05D4 \u05E7\u05D5\u05D3\u05DE\u05EA",
      nextYear: "\u05E9\u05E0\u05D4 \u05D4\u05D1\u05D0\u05D4",
      prevMonth: "\u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD",
      nextMonth: "\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D1\u05D0"
    },
    inputNumber: {
      increment: "\u05D4\u05D5\u05E1\u05E3",
      decrement: "\u05D4\u05E4\u05D7\u05EA"
    },
    commandPalette: {
      placeholder: "\u05D4\u05E7\u05DC\u05D3 \u05E4\u05E7\u05D5\u05D3\u05D4...",
      noMatch: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05D6\u05DE\u05D9\u05E0\u05D9\u05DD",
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    selectMenu: {
      noMatch: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD",
      create: '\u05E6\u05D5\u05E8 "{label}"',
      search: "\u05D7\u05E4\u05E9..."
    },
    toast: { close: "\u05E1\u05D2\u05D5\u05E8" },
    carousel: {
      prev: "\u05D4\u05E7\u05D5\u05D3\u05DD",
      next: "\u05D4\u05D1\u05D0",
      goto: "\u05DE\u05E2\u05D1\u05E8 \u05DC {slide}"
    },
    modal: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    slideover: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    alert: {
      close: "\u05E1\u05D2\u05D5\u05E8"
    },
    table: {
      noData: "\u05D0\u05D9\u05DF \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DC\u05D4\u05E6\u05D2\u05D4"
    }
  }
});
