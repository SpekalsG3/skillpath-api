function isNumeric (str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

module.exports = {
  isNumeric,
};
