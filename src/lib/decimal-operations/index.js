export const addDecimals = function(sum) {
  return sum.map(i => i * 100).reduce((tot, i) => tot + i, 0) / 100;
}

export const subtractDecimals = function(...amounts) {
  const s = [...amounts];
  const start = s.shift() * 100;
  return s.map(i => i * 100).reduce((tot, i) => tot - i, start) / 100;
}