"use server";

export async function getDateTimeZone() {
  const timeZone = "America/Sao_Paulo";

  const formatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const now = new Date();

  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find(p => p.type === "hour")?.value);
  const minute = Number(parts.find(p => p.type === "minute")?.value);

  return {
    localTime: formatter.format(now),
    hour,
    minute,
    timeZone,
  };
}
