export function normalizePrice(rawPrice: string): string {
  return rawPrice.match(/\d+[.,]?\d*/)?.[0] ?? '';
}
