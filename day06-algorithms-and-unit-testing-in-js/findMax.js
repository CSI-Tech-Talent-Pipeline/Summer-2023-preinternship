function findMax(arr) {
    
    if (arr.length === 0) {
        return null;
    } else if (arr.length === 1) {
        return arr[0];
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
