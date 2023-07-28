function maxSubArrayOfSizeK(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;
  
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    const windowWidth = windowEnd - windowStart + 1;
    // we add to the windowSum until we hit the window size
    windowSum += arr[windowEnd];

    // when the window width reaches k, store the windowSum as maxSum
    // this is the first window, so the windowSum will be the first sum
    // we've seen so far
    if (windowWidth === k) {
      // this will only be true the first time that we have a window
      // because our loop is incrementing the end point of the window
      // making the windowWidth wider by 1 upon every iteration

      // we need to store the sum of the first window of k elements
      maxSum = windowSum;
    } else if (windowWidth > k) {
      // the window is too wide, so we need to remove the element that
      // should no longer be inside the window from the windowSum
      // and then increment the windowStart pointer (sliding the window)
      windowSum -= arr[windowStart];
      windowStart++;
      // update the maxSum if windowSum is more than previous maxSum
      maxSum = Math.max(maxSum, windowSum);
    } 
  }

  return maxSum;
}

console.log(maxSubArrayOfSizeK([5, 1, 5, 1, 3, 2], 3));


/*
// first iteration
[2, 1, 5, 1, 3, 2]
| |
windowStart = 0 
windowEnd = 0
windowWidth = 0 - 0 + 1 => 1
windowSum = 0 
maxSum = 0
// second iteration
[2, 1, 5, 1, 3, 2]
|    |
windowStart = 0 
windowEnd = 1 
windowWidth = 1 - 0 + 1 => 2
windowSum = 3 
maxSum = 0
// third iteration
[2, 1, 5, 1, 3, 2]
|       |
windowStart = 0 
windowEnd = 2 
windowWidth = 2 - 0 + 1 => 3
windowSum = 2 + 1 + 5 = 8 
maxSum = 0
// fourth iteration
[2, 1, 5, 1, 3, 2]
   |       |
windowStart = 0
windowEnd = 3
windowWidth = 3 - 0 + 1 => 4
windowSum = 2 - 2 + 1 + 5 + 1 = 7
maxSum = 8
windowStart => 1
// fifth iteration
[2, 1, 5, 1, 3, 2]
      |       |
windowEnd = 4
windowStart = 1
windowWidth = 4 - 1 + 1 => 4
windowSum = 2 - 2 + 1 - 1 + 5 + 1 + 3 = 9
maxSum = 9
windowStart => 2
// sixth iteration
[2, 1, 5, 1, 3, 2]
         |       |
windowStart = 2
windowEnd = 5
windowWidth = 5 - 2 + 1 => 4
windowSum = 2 + 1 + 5 + 1 - 2 + 3 - 1 + 2 - 5 = 6
maxSum = 9
windowStart => 3
windowEnd => 6
arr.length => 6 
END OF LOOP
maxSum is 9
*/