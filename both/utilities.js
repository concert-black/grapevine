import * as constants from '/both/constants';

export function distance (a, b) { // stolen from stack overflow
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const r = 0.5 - c((b.latitude - a.latitude) * p) / 2 +
    c(a.latitude * p) * c(b.latitude * p) *
    (1 - c((b.longitude - a.longitude) * p)) / 2;
  return 12742000 * Math.asin(Math.sqrt(r)); // 2 * r; r = 6371 km
}
export function format (x, units, long) {
  let correct = units[0];
  let index = units.length;
  while (index--) {
    if (x >= units[index].value) {
      correct = units[index];
      break;
    }
  }
  return Math.round(x / correct.value) + (long ? ' ' + correct.long : correct.short);
}
export function checkPost (content) {
  const length = Match.Where((string) => {
    check(string, String);
    return 0 < string.length && string.length <= constants.POST_CHARACTER_LIMIT;
  });
  return Match.test(content, length);
}
export const checkComment = checkPost;
