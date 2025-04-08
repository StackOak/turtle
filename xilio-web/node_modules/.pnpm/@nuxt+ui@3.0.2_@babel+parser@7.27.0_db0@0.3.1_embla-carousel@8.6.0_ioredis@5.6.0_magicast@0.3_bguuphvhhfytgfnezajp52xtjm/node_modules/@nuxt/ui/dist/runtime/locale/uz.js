import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "O\u02BBzbek",
  code: "uz",
  messages: {
    inputMenu: {
      noMatch: "Mos keluvchi natija topilmadi",
      noData: "Ma\u02BClumot yo\u02BBq",
      create: '"{label}" yaratish'
    },
    calendar: {
      prevYear: "Oldingi yil",
      nextYear: "Keyingi yil",
      prevMonth: "Oldingi oy",
      nextMonth: "Keyingi oy"
    },
    inputNumber: {
      increment: "Qo\u02BBshish",
      decrement: "Ayirish"
    },
    commandPalette: {
      placeholder: "Buyruq kiriting yoki qidiring...",
      noMatch: "Mos keluvchi natija topilmadi",
      noData: "Ma\u02BClumot yo\u02BBq",
      close: "Yopish"
    },
    selectMenu: {
      noMatch: "Mos keluvchi natija topilmadi",
      noData: "Ma\u02BClumot yo\u02BBq",
      create: '"{label}" yaratish',
      search: "Qidirish..."
    },
    toast: {
      close: "Yopish"
    },
    carousel: {
      prev: "Ortga",
      next: "Oldinga",
      goto: "{slide}-slaydga o\u2018tish"
    },
    modal: {
      close: "Yopish"
    },
    slideover: {
      close: "Yopish"
    },
    alert: {
      close: "Yopish"
    },
    table: {
      noData: "Ma\u02BClumot yo\u02BBq"
    }
  }
});
