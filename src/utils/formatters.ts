export const numberFormatter = Intl.NumberFormat("en-US", {
  signDisplay: "always",
});

const DISPLAYED_ROUNDING = 10;

export function displayNumber(num: number) {
  return Math.floor(num * DISPLAYED_ROUNDING) / DISPLAYED_ROUNDING;
}