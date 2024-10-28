export const numberFormatter = Intl.NumberFormat("en-US", {
  signDisplay: "always",
});

export function displayNumber(num: number) {
  return parseFloat(num.toFixed(1));
}