import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "\u65E5\u672C\u8A9E",
  code: "ja",
  messages: {
    inputMenu: {
      noMatch: "\u4E00\u81F4\u3059\u308B\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      noData: "\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      create: '"{label}"\u3092\u4F5C\u6210'
    },
    calendar: {
      prevYear: "\u524D\u5E74",
      nextYear: "\u7FCC\u5E74",
      prevMonth: "\u524D\u6708",
      nextMonth: "\u7FCC\u6708"
    },
    inputNumber: {
      increment: "\u5897\u3084\u3059",
      decrement: "\u6E1B\u3089\u3059"
    },
    commandPalette: {
      placeholder: "\u30B3\u30DE\u30F3\u30C9\u3092\u5165\u529B\u3059\u308B\u304B\u691C\u7D22...",
      noMatch: "\u4E00\u81F4\u3059\u308B\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      noData: "\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      close: "\u9589\u3058\u308B"
    },
    selectMenu: {
      noMatch: "\u4E00\u81F4\u3059\u308B\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      noData: "\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093",
      create: '"{label}"\u3092\u4F5C\u6210',
      search: "\u691C\u7D22..."
    },
    toast: {
      close: "\u9589\u3058\u308B"
    },
    carousel: {
      prev: "\u524D\u3078",
      next: "\u6B21\u3078",
      goto: "\u30B9\u30E9\u30A4\u30C9 {slide} \u306B\u79FB\u52D5"
    },
    modal: {
      close: "\u9589\u3058\u308B"
    },
    slideover: {
      close: "\u9589\u3058\u308B"
    },
    alert: {
      close: "\u9589\u3058\u308B"
    },
    table: {
      noData: "\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093"
    }
  }
});
