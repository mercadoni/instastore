function getRandomNumberBetweenRange(lower, upper) {
  return Math.round(Math.random() * (upper - lower)) + lower;
} 

module.exports = {
  getRandomNumberBetweenRange
}
