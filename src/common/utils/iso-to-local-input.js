/**
 * Convert ISO date string to local datetime-local input value (YYYY-MM-DDTHH:mm).
 * @param {string} iso - ISO 8601 date string
 * @returns {string} Empty string if invalid/missing
 */
export function isoToLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
