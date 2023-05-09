export function getRandomNumber(): number {
  const min = 200;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
