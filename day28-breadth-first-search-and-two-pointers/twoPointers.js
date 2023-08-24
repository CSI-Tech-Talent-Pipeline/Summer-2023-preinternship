function twoPointersSum(array, targetSum) {
  let i = 0;
  let j = array.length - 1;

  while (i < j) {
    let sum = array[i] + array[j];

    if (sum === targetSum) {
      return [i, j];
    } else if (sum < targetSum) {
      i++;
    } else {
      j--;
    }
  }

  return [-1, -1];
}

module.exports = twoPointersSum;