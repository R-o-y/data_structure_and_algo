/*====================================================================================
            left = middle or right = middle (easiest to understand and useful)
=====================================================================================*/

function searchLeftBound(array, targetValue) {
    var left = -1  // notice this; consider the case where array[0] equals the target targetValue
    var right = array.length - 1
    while(left < right - 1) {  // stop when left + 1 == right
        var middle = Math.floor((left + right) / 2)
        if (targetValue <= array[middle])
            right = middle
        else
            left = middle
    }
    return right  // `right` is the leftmost index >= targetValue, `left` is the rightmost index < targetValue
}

function searchRightBound(array, targetValue) {
    var left = 0  // notice this; consider the case where array[0] equals the target targetValue
    var right = array.length
    while(left < right - 1) {  // stop when left + 1 == right
        var middle = Math.floor((left + right) / 2)
        if (targetValue < array[middle])
            right = middle
        else
            left = middle
    }
    return left  // `left` is the rightmost index <= targetValue, `right` is the leftmost index > targetValue
}


/*================================================================================
                left = middle + 1 or right = middle - 1
=================================================================================*/

function searchLeftBound(array, targetValue) {
    var left = 0
    var right = array.length - 1
    while(left <= right) {  // notice when left == right, need to run one more iteration
        var middle = Math.floor((left + right) / 2)
        if (targetValue <= array[middle])
            right = middle - 1
        else
            left = middle + 1
    }
    return left  // `left` is the leftmost index >= targetValue, `right` is the rightmost index < targetValue
}

function searchRightBound(array, targetValue) {
    var left = 0
    var right = array.length - 1
    while(left <= right) {  // notice when left == right, need to run one more iteration
        var middle = Math.floor((left + right) / 2)
        if (targetValue < array[middle])
            right = middle - 1
        else
            left = middle + 1
    }
    return right  // `right` is the rightmost indes <= targetValue, `left` is the leftmost index > targetValue
}


/*===================================================================================
                decide between left and right at the end
====================================================================================*/

/**
 * recursion version binary search
 * find the leftmost index with the value equaling the targetValue
 * if target value not in array, return -1
 */
function binarySearch(sortedArray, targetValue) {
    function binarySearchRecursion(sortedArray, targetValue, left, right) {
        if (right <= left + 1)
            return sortedArray[left] == targetValue ? left : sortedArray[right] == targetValue ? right : -1
        var middle = Math.floor((left + right) / 2)
        if (targetValue <= sortedArray[middle])
            return binarySearchRecursion(sortedArray, targetValue, left, middle)
        else
            return binarySearchRecursion(sortedArray, targetValue, middle, right)
    }
    return binarySearchRecursion(sortedArray, targetValue, 0, sortedArray.length - 1)
}

/**
 * loop version binary search
 * find the leftmost index with the value equaling the targetValue
 * if target value not in array, return -1
 */
function binarySearch(sortedArray, targetValue) {
    var left = 0
    var right = sortedArray.length - 1
    while (right > left + 1) {
        var middle = Math.floor((left + right) / 2)
        if (targetValue <= sortedArray[middle])
            right = middle
        else
            left = middle
    }
    return sortedArray[left] == targetValue ? left : sortedArray[right] == targetValue ? right : -1
}























