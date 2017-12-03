/**
 * find the kth element in a random order array
 * @param {Array} array
 * @param {Integer} k 
 */
function quickSelectValueFromIndex(array, k) {
    var left = 0
    var right = array.length - 1
    while (left < right) {
        var index = partition(array, array[left], left, right)
        if (k === index)
            return array[index]
        else if (k < index)
            right = index - 1
        else if (k > index)
            left = index + 1
    }
}

/**
 * find the index of the given value in a random order array
 * @param {Array} array 
 * @param {*} value 
 */
function quickSelectIndexFromValue(array, value) {
    var left = 0
    var right = array.length - 1
    while (left < right) {
        var index = partition(array, value, left, right)
        if (array[index] === value)
            return index
        else if (array[index] < value )
            left = index
        else if (array[index] > value)
            right = index
    }
    return null
}

/**
 * partition the array in place so that: left partition < ele <= right partition
 * and return the left-bound index of right partition
 * @param {Array} array 
 * @param {*} ele 
 */
function partition(array, ele, initLeft, initRight) {
    function exchange(array, i1, i2) {
        var temp = array[i1]
        array[i1] = array[i2]
        array[i2] = temp
    }
    
    // partition
    var left = initLeft - 1
    var right = initRight
    while (left < right) {
        while (left < right && array[right] >= ele)
            right--
        while (left < right && (array[left] < ele || left < initLeft))
            left++
        if (left < right)
            exchange(array, left, right)
    }

    // move ele to middle
    var pivot = right + 1
    for (var i = right + 1; i < array.length; i++)
        if (array[i] === ele) {
            exchange(array, pivot, i)
            pivot++
        }
    return right + 1
}


var a = [2,1,3,4,-1,8,13,3]
// console.log(partition(a, -1, 0, a.length - 1))
// console.log(a)


// console.log(quickSelectIndexFromValue(a, 13))
// a.sort((a, b) => a - b)
// console.log(a)

console.log(quickSelectValueFromIndex(a, 3))
a.sort((a, b) => a - b)
console.log(a)




















