export function capitalizeString(str: string): string {
  if (str.length === 0) {
    return str; // Return an empty string if input is empty
  }

  const firstChar = str.charAt(0).toUpperCase();
  const remainingChars = str.slice(1);

  return `${firstChar}${remainingChars}`;
}