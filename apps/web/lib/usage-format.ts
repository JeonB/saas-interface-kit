/** Formats MRR in USD as a compact label, e.g. 48200 → "$48.2k". */
export function formatMrrUsd(mrrUsd: number): string {
  if (mrrUsd >= 1_000) {
    return `$${(mrrUsd / 1_000).toFixed(1)}k`;
  }
  return `$${mrrUsd.toFixed(0)}`;
}

/** Formats a 0–1 churn ratio as a percentage, e.g. 0.01 → "1.0%". */
export function formatChurnRate(churnRate: number): string {
  return `${(churnRate * 100).toFixed(1)}%`;
}

/** Formats seat counts with thousands separators, e.g. 1842 → "1,842". */
export function formatActiveSeats(activeSeats: number): string {
  return activeSeats.toLocaleString("en-US");
}
