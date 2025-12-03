// arquivo: data-atual.js

// Cria um objeto Date com o horário atual
const agora = new Date();

// Formata a data no formato brasileiro, com dia da semana
const dataFormatadaBR = agora.toLocaleDateString("pt-BR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "America/Sao_Paulo",
});

// Formata a mesma data no padrão ISO (YYYY-MM-DD) para referência
const dataFormatadaISO = agora.toLocaleDateString("sv-SE", {
  timeZone: "America/Sao_Paulo",
});

console.log(`DATA ATUAL: Hoje é ${dataFormatadaBR} (${dataFormatadaISO})`);