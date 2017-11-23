class BinaryTreeNode {
    constructor(key, parent=null, leftChild=null, rightChild=null) {
        this.key = key
        this.parent = parent
        this.leftChild = leftChild
        this.rightChild = rightChild
    }

    toString() {
        return this.key.toString()
    }

    getRoot() {
        var node = this
        while (node.parent !== null)
            node = node.parent
        return node
    }

    draw() {
        function repeat(char, times) {
            return (new Array(times).fill(char).join(''))
        }
        function buildRepr(node) {
            if (node === null)
                return [[], 0, 0, 0]
            var nodeRepr = node.toString()
            var newRootWidth = nodeRepr.length
            var gapSize = nodeRepr.length
            var [lBox, lBoxWidth, lRootStart, lRootEnd] = buildRepr(node.leftChild)
            var [rBox, rBoxWidth, rRootStart, rRootEnd] = buildRepr(node.rightChild)
            var line1 = []
            var line2 = []

            if (lBoxWidth > 0) {
                var lRoot = -Math.floor(-(lRootStart + lRootEnd) / 2) + 1
                line1.push(repeat(' ', lRoot + 1))
                line1.push(repeat('_', lBoxWidth - lRoot))
                line2.push(repeat(' ', lRoot) + '/')
                line2.push(repeat(' ', lBoxWidth - lRoot))
                var newRootStart = lBoxWidth + 1
                gapSize += 1
            } else
                var newRootStart = 0

            line1.push(nodeRepr)
            line2.push(repeat(' ', newRootWidth))

            if (rBoxWidth > 0) {
                var rRoot = Math.floor((rRootStart + rRootEnd) / 2)
                line1.push(repeat('_', rRoot))
                line1.push(repeat(' ', rBoxWidth - rRoot + 1))
                line2.push(repeat(' ', rRoot) + '\\')
                line2.push(repeat(' ', rBoxWidth - rRoot))
                gapSize += 1
            }
            var newRootEnd = newRootStart + newRootWidth - 1

            var gap = repeat(' ', gapSize)
            var newBox = [line1.join(''), line2.join('')]
            for (var i = 0; i < Math.max(lBox.length, rBox.length); i++) {
                var lLine = i < lBox.length ? lBox[i] : repeat(' ', lBoxWidth)
                var rLine = i < rBox.length ? rBox[i] : repeat(' ', rBoxWidth)
                newBox.push(lLine + gap + rLine)
            }

            return [newBox, newBox[0].length, newRootStart, newRootEnd]
        }
        return '\n' + buildRepr(this)[0].join('\n')
    }

    /**
     * return an array of the breadth first traversal result
     */
    breadthFirstTraverse() {
        var queue = [this]
        var result = []
        while (queue.length != 0) {
            var head = queue.shift()
            if (head.leftChild !== null)
                queue.push(head.leftChild)
            if (head.rightChild !== null)
                queue.push(head.rightChild)
            result.push(head)
        }
        return result
    }

    /**
     * return an array of the depth first traversal result
     */
    preOrderTraverseWithStack() {
        var stack = [this]
        var result = []
        while (stack.length != 0) {
            var tail = stack.pop()
            if (tail.rightChild !== null)
                stack.push(tail.rightChild)
            if (tail.leftChild !== null)
                stack.push(tail.leftChild)
            result.push(tail)
        }
        return result
    }

    inOrderTraverseWithRecursion() {
        var result = []
        function innerRecur(node) {
            if (node.leftChild !== null)
                innerRecur(node.leftChild)
            result.push(node)
            if (node.rightChild !== null)
                innerRecur(node.rightChild)
        }
        innerRecur(this)
        return result
    }
}


module.exports = BinaryTreeNode




