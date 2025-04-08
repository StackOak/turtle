import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "\u7E41\u9AD4\u4E2D\u6587",
  code: "zh-TW",
  messages: {
    inputMenu: {
      noMatch: "\u6C92\u6709\u76F8\u7B26\u7684\u8CC7\u6599",
      noData: "\u6C92\u6709\u8CC7\u6599",
      create: "\u5EFA\u7ACB\u300C{label}\u300D"
    },
    calendar: {
      prevYear: "\u53BB\u5E74",
      nextYear: "\u660E\u5E74",
      prevMonth: "\u4E0A\u500B\u6708",
      nextMonth: "\u4E0B\u500B\u6708"
    },
    inputNumber: {
      increment: "\u589E\u52A0",
      decrement: "\u6E1B\u5C11"
    },
    commandPalette: {
      placeholder: "\u8F38\u5165\u547D\u4EE4\u6216\u641C\u5C0B...",
      noMatch: "\u6C92\u6709\u76F8\u7B26\u7684\u8CC7\u6599",
      noData: "\u6C92\u6709\u8CC7\u6599",
      close: "\u95DC\u9589"
    },
    selectMenu: {
      noMatch: "\u6C92\u6709\u76F8\u7B26\u7684\u8CC7\u6599",
      noData: "\u6C92\u6709\u8CC7\u6599",
      create: "\u5EFA\u7ACB\u300C{label}\u300D",
      search: "\u641C\u5C0B..."
    },
    toast: {
      close: "\u95DC\u9589"
    },
    carousel: {
      prev: "\u4E0A\u4E00\u9801",
      next: "\u4E0B\u4E00\u9801",
      goto: "\u8DF3\u8F49\u5230\u7B2C {slide} \u9801"
    },
    modal: {
      close: "\u95DC\u9589"
    },
    slideover: {
      close: "\u95DC\u9589"
    },
    alert: {
      close: "\u95DC\u9589"
    },
    table: {
      noData: "\u6C92\u6709\u8CC7\u6599"
    }
  }
});
