/**
 * find the kth element in a min heap
 * @param {Array} heap an array representing a min heap
 */
function findKthInHeap(heap, k) {
    class NodeRepr {
        constructor(indexInOrigHeap, value) {
            this.indexInOrigHeap = indexInOrigHeap
            this.value = value
        }
        valueOf() {
            return this.value
        }
    }
    var result = []
    var helperHeap = [new NodeRepr(0, heap[0])]
    for (var i = 0; i <= k; i++) {
        var top = pop(helperHeap)
        var index = top.indexInOrigHeap
        if (left(index) <= heap.length - 1)
            push(helperHeap, new NodeRepr(left(index), heap[left(index)]))
        if (right(index) <= heap.length - 1)
            push(helperHeap, new NodeRepr(right(index), heap[right(index)]))
        result.push(top)
    }
    result = result.map(item => item.valueOf())
    return result[result.length - 1]
}

/**
 * remove and return the heap top
 */
function pop(heap) {
    exchange(heap, 0, heap.length - 1)
    var result = heap.pop()
    sinkDown(heap, 0)
    return result
}

function sinkDown(heap, index) {
    var last = heap.length - 1
    if (left(index) > last) {
        return
    } else if (left(index) === last) {
        if (heap[index].valueOf() > heap[left(index)].valueOf())
            exchange(heap, index, left(index))
    } else {  // 2 children
        if (heap[left(index)].valueOf() < heap[right(index)].valueOf()) {
            if (heap[index].valueOf() > heap[left(index)].valueOf()) {
                exchange(heap, index, left(index))
                sinkDown(heap, left(index))
            } else return
        } else {
            if (heap[index].valueOf() > heap[right(index)].valueOf()) {
                exchange(heap, index, right(index))
                sinkDown(heap, right(index))
            } else return
        }
    }
}

/**
 * pop up the element at `index` in the heap
 * @param {Array} heap a min heap
 * @param {Integer} index position of target elemet in the `heap`
 */
function floatUp(heap, index) {
    if (index <= 0)
        return
    if (heap[index].valueOf() < heap[parent(index)].valueOf()) {
        exchange(heap, index, parent(index))
        floatUp(heap, parent(index))
    } else 
        return
}

function parent(index) {
    return parseInt((index - 1) / 2)
}

function left(index) {
    return 2 * index + 1
}

function right(index) {
    return 2 * index + 2
}

function exchange(heap, i1, i2) {
    var temp = heap[i1]
    heap[i1] = heap[i2]
    heap[i2] = temp
}

function buildMinHeap(array) {
    for (var i = array.length - 1; i >= 0; i--)
        sinkDown(array, i)
    return array
}

function push(heap, value) {
    heap.push(value)
    floatUp(heap, heap.length - 1)
}

var heap = buildMinHeap([1,4,2,8,6,3])
console.log(findKthInHeap(heap, 0))
console.log(findKthInHeap(heap, 1))
console.log(findKthInHeap(heap, 2))
console.log(findKthInHeap(heap, 3))


