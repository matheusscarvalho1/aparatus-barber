export function formatPrice(priceInCents: number): string {
  const priceInReais = priceInCents / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInReais);
}
