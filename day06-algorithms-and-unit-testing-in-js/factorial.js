function factorial(n) {
  if ([0, 1].includes(n)) {
    return 1;
  }
  return n * factorial(n - 1);
}
module.exports = factorial;
