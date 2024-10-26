export const numberFormatter = Intl.NumberFormat("en-US", {
  signDisplay: "always",
});

export function displayNumber(num: number) {
  return num.toFixed(1);
}