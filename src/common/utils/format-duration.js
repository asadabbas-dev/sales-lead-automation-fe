/**
 * Format milliseconds for display (e.g. 5661 → "5.7s", 800 → "800ms")
 * @param {number | null | undefined} ms
 * @returns {string | null}
 */
export function formatDuration(ms) {
  if (ms == null || typeof ms !== "number" || Number.isNaN(ms)) return null;
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}
