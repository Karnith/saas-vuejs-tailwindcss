export default function formatMoney(toFormat: number): string {
  return toFormat.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
