function cyclicSort(nums) {
  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    const value = nums[currentIndex];
    const correctIndex = value - 1;
    if (currentIndex !== correctIndex) {
      // const valueAtCorrectIndex = nums[correctIndex]; // store the valueAtCorrectIndex 
      // nums[correctIndex] = value; // place value at correctIndex
      // nums[currentIndex] = valueAtCorrectIndex; // place valueAtCorrectindex in currentIndex
      [nums[currentIndex], nums[correctIndex]] = [nums[correctIndex], nums[currentIndex]]
      // [nums[0], nums[1]] = [1,2] // nums[0] = 1 ; nums[1] = 2;
    }
  }
  return nums;
}

/*----------------------------------------------------------------
[2,1]
currentIndex = 0 
value = 2
correctIndex = 1
if currentIndex !== correctIndex (0 !== 1)
current array:
2 1
swap elements at currentIndex and correctIndex
1 2
currentIndex = 1
value = 2
correctIndex = 1
if currentIndex !== correctIndex (1 !== 1) false
currentIndex = 2 loop runs while currentIndex < array.length (2) so loop terminates
return nums:
1 2


i = 0, arr[i] is 5 which should be at index 4 so swap values at i(0) and 4
5 3 2 1 4
4 3 2 1 5
i = 1, arr[i] is 3 which should be at index 2 so swap values at i(1) and 2
4 3 2 1 5
4 2 3 1 5
i = 2, arr[i] is 3 which should be at index 2, and it is (because i === 2) so no swap
4 2 3 1 5
4 2 3 1 5
i = 3, arr[i] is 1 which should be at index 0, so swap values at i(3) and 0
4 2 3 1 5
1 2 3 4 5
i = 4, arr[i] is 5 which should be at index 4, and it is because i === 4) so no swap
1 2 3 4 5
1 2 3 4 5
i = 5, while loop condition is false
return the sorted array
----------------------------------------------------------------*/

module.exports = cyclicSort;
