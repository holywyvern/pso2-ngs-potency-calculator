const ROUND_DIGITS = 10000;

export function round(num: number) {
  return Math.floor(num * ROUND_DIGITS) / ROUND_DIGITS;
}