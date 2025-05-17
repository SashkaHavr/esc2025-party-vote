export function roundTo2(num: number) {
  if (num == 0) {
    return 0;
  }
  return Math.round(num * 100) / 100;
}
