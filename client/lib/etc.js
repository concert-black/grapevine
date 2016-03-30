distance = (a, b) => {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const r = 0.5 - c((b.latitude - a.latitude) * p) / 2 +
    c(a.latitude * p) * c(b.latitude * p) *
    (1 - c((b.longitude - a.longitude) * p)) / 2;

  return 12742000 * Math.asin(Math.sqrt(r)); // 2 * R; R = 6371 km
}

format = (x, units) => {
  let correct = units[0];
  let index = units.length;
  while (index--) {
    if (x >= units[index].value) {
      correct = units[index];
      break;
    }
  }
  return Math.round(x / correct.value) + correct.name;
}
