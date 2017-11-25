var AVLTreeNode = require('./avl_tree_node.js')

class IntervalTreeNode extends AVLTreeNode {
    constructor(low, high, parent=null, leftChild=null, rightChild=null, height=0) {
        super(low, parent, leftChild, rightChild, height)
        this.low = low
        this.high = high
        this.subtreeHighest = high
    }

    toString() {
        return this.low + ',' + this.high + '(' + this.subtreeHighest + ')'
    }

    getLeftSubtreeHighest() {
        return this.leftChild === null ? -Infinity : this.leftChild.subtreeHighest
    }

    getRightSubtreeHighest() {
        return this.rightChild === null ? -Infinity : this.rightChild.subtreeHighest
    }

    updateSubtreeHighest() {
        this.subtreeHighest = Math.max(this.high, this.getLeftSubtreeHighest(), this.getRightSubtreeHighest())
    }
    
    updateSubtreeHighestToRoot() {
        this.updateSubtreeHighest()
        if (this.parent !== null)
            this.parent.updateSubtreeHighestToRoot()
    }
    
    leftRotate() {
        super.leftRotate()
        this.updateSubtreeHighestToRoot()
        this.parent.updateSubtreeHighestToRoot()
    }

    rightRotate() {
        super.rightRotate()
        this.updateSubtreeHighestToRoot()
        this.parent.updateSubtreeHighestToRoot()
    }

    insert(node) {
        super.insert(node)
        this.updateSubtreeHighestToRoot()
    }
}

////////////////////// test
var nodes = [
    new IntervalTreeNode(1, 6),
    new IntervalTreeNode(2, 5),
    new IntervalTreeNode(2, 6),
    new IntervalTreeNode(3, 4),
    new IntervalTreeNode(4, 9),
    new IntervalTreeNode(5, 12),
    new IntervalTreeNode(6, 7),
    new IntervalTreeNode(7, 8),
]

var node = IntervalTreeNode.buildFromArray(nodes)

console.log(node.getRoot().breadthFirstTraverse().map(node => node.key))
console.log(node.getRoot().preOrderTraverseWithStack().map(node => node.key))
console.log(node.getRoot().inOrderTraverseWithRecursion().map(node => node.key))
console.log(node.getNodeByKey(2).draw())
console.log(node.getRoot().draw())




module.exports = IntervalTreeNode




