import { defineLocale } from "../composables/defineLocale.js";
export default defineLocale({
  name: "Portugu\xEAs",
  code: "pt",
  messages: {
    inputMenu: {
      noMatch: "Nenhum dado correspondente",
      noData: "Sem dados",
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
      noData: "Sem dados",
      close: "Fechar"
    },
    selectMenu: {
      noMatch: "Nenhum dado correspondente",
      noData: "Sem dados",
      create: 'Criar "{label}"',
      search: "Buscar..."
    },
    toast: {
      close: "Fechar"
    },
    carousel: {
      prev: "Anterior",
      next: "Pr\xF3ximo",
      goto: "Ir ao diapositivo {slide}"
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
      noData: "Sem dados"
    }
  }
});
