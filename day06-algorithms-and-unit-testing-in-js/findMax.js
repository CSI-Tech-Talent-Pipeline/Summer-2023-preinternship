function findMax(arr) {
  if (arr.length === 0) {
    return null;
  } 
  let largestSeen = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largestSeen) {
      largestSeen = arr[i];
    }
  }
  return largestSeen;
}
module.exports = findMax;