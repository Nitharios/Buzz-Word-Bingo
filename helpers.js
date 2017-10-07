/* jshint esversion:6 */

module.exports = {
  buzzWordChecker : buzzWordChecker
};

function buzzWordChecker(req, array, needIndex) {
  for (let i = 0; i < array.length; i++) {
    if (req.body.buzzWord === array[i].buzzWord) {
      if (needIndex) return i;
      else return true;
    }
  }

  return -1;
} 