"use server";

export async function getDateTimeZone() {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const now = new Date();
  const parts = formatter.formatToParts(now);

  const hour = Number(parts.find(p => p.type === "hour")?.value);
  const minute = Number(parts.find(p => p.type === "minute")?.value);

  return {
    iso: now.toISOString(), // sempre UTC
    local: formatter.format(now), // horário de Brasília
    hour,
    minute,
    timezone: "America/Sao_Paulo",
  };
}