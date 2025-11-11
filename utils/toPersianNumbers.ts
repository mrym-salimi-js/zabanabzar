// Convet en number to fa number
export function toPersianNumbers(input: string | number) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return input.toString().replace(/\d/g, (d) => persianDigits[+d]);
}
