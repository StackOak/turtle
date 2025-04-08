import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "\u7B80\u4F53\u4E2D\u6587",
  code: "zh-CN",
  messages: {
    inputMenu: {
      noMatch: "\u6CA1\u6709\u5339\u914D\u7684\u6570\u636E",
      noData: "\u6CA1\u6709\u6570\u636E",
      create: '\u521B\u5EFA "{label}"'
    },
    calendar: {
      prevYear: "\u53BB\u5E74",
      nextYear: "\u660E\u5E74",
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708"
    },
    inputNumber: {
      increment: "\u589E\u52A0",
      decrement: "\u51CF\u5C11"
    },
    commandPalette: {
      placeholder: "\u8F93\u5165\u547D\u4EE4\u6216\u641C\u7D22...",
      noMatch: "\u6CA1\u6709\u5339\u914D\u7684\u6570\u636E",
      noData: "\u6CA1\u6709\u6570\u636E",
      close: "\u5173\u95ED"
    },
    selectMenu: {
      noMatch: "\u6CA1\u6709\u5339\u914D\u7684\u6570\u636E",
      noData: "\u6CA1\u6709\u6570\u636E",
      create: '\u521B\u5EFA "{label}"',
      search: "\u641C\u7D22..."
    },
    toast: {
      close: "\u5173\u95ED"
    },
    carousel: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875",
      goto: "\u8DF3\u8F6C\u5230\u7B2C {slide} \u9875"
    },
    modal: {
      close: "\u5173\u95ED"
    },
    slideover: {
      close: "\u5173\u95ED"
    },
    alert: {
      close: "\u5173\u95ED"
    },
    table: {
      noData: "\u6CA1\u6709\u6570\u636E"
    }
  }
});
