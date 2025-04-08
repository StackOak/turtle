import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Portugu\xEAs (Brasil)",
  code: "pt-BR",
  messages: {
    inputMenu: {
      noMatch: "Nenhum dado correspondente",
      noData: "Nenhum dado",
      create: 'Criar "{label}"'
    },
    calendar: {
      prevYear: "Ano anterior",
      nextYear: "Pr\xF3ximo ano",
      prevMonth: "M\xEAs anterior",
      nextMonth: "Pr\xF3ximo m\xEAs"
    },
    inputNumber: {
      increment: "Incrementar",
      decrement: "Decrementar"
    },
    commandPalette: {
      placeholder: "Digite um comando ou pesquise...",
      noMatch: "Nenhum dado correspondente",
      noData: "Nenhum dado",
      close: "Fechar"
    },
    selectMenu: {
      noMatch: "Nenhum dado correspondente",
      noData: "Nenhum dado",
      create: 'Criar "{label}"',
      search: "Pesquisar..."
    },
    toast: {
      close: "Fechar"
    },
    carousel: {
      prev: "Anterior",
      next: "Pr\xF3ximo",
      goto: "Ir para a slide {slide}"
    },
    modal: {
      close: "Fechar"
    },
    slideover: {
      close: "Fechar"
    },
    alert: {
      close: "Fechar"
    },
    table: {
      noData: "Nenhum dado"
    }
  }
});
