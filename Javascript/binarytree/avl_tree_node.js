var BinarySearchTreeNode = require('./binary_search_tree_node.js')

class AVLTreeNode extends BinarySearchTreeNode {
    constructor(key, parent=null, leftChild=null, rightChild=null, height=0) {
        super(key, parent, leftChild, rightChild)
        this.height = height
    }

    toString() {
        return this.key + ': ' + this.height
    }

    rightRotate() {
        var newRoot = this.leftChild
        if (this.parent === null)
            newRoot.parent = null
        else
            if (this.parent.leftChild === this)
                this.parent.setLeftChild(newRoot)
            else
                this.parent.setRightChild(newRoot)
        this.setLeftChild(newRoot.rightChild)
        newRoot.setRightChild(this)
        this.updateHeightToRoot()
        newRoot.updateHeightToRoot()
    }

    leftRotate() {
        var newRoot = this.rightChild
        if (this.parent == null)
            newRoot.parent = null
        else
            if (this.parent.leftChild === this)
                this.parent.setLeftChild(newRoot)
            else
                this.parent.setRightChild(newRoot)
        this.setRightChild(newRoot.leftChild)
        newRoot.setLeftChild(this)
        this.updateHeightToRoot()
        newRoot.updateHeightToRoot()
    }

    getLeftChildHeight() {
        return this.leftChild === null ? -1 : this.leftChild.height
    }

    getRightChildHeight() {
        return this.rightChild === null ? -1 : this.rightChild.height
    }

    updateHeight() {
        this.height = Math.max(this.getLeftChildHeight(), this.getRightChildHeight()) + 1
    }

    updateHeightToRoot() {
        this.updateHeight()
        if (this.parent !== null)
            this.parent.updateHeightToRoot()
    }

    checkAndRotate() {
        if (this.getLeftChildHeight() > this.getRightChildHeight() + 1) {  // unbalance and left-heavy
            // non-zigzag
            if (this.leftChild.getLeftChildHeight() >= this.leftChild.getRightChildHeight())
                this.rightRotate()
            else {
                this.leftChild.leftRotate()
                this.rightRotate()
            }
        } else if (this.getRightChildHeight() > this.getLeftChildHeight() + 1) {
            if (this.rightChild.getRightChildHeight() >= this.rightChild.getLeftChildHeight())
                this.leftRotate()
            else {
                this.rightChild.rightRotate()
                this.leftRotate()
            }
        } else {
            if (this.parent !== null)
                this.parent.checkAndRotate()
        }
    }

    insert(node) {
        if (node.key <= this.key) {
            if (this.leftChild === null) {
                this.setLeftChild(node)
                this.updateHeightToRoot()
                this.checkAndRotate()
            } else
                this.leftChild.insert(node)
        } else {
            if (this.rightChild === null) {
                this.setRightChild(node)
                this.updateHeightToRoot()
                this.checkAndRotate()
            } else
                this.rightChild.insert(node)
        } 
    }

    delete() {
        var curr = this.parent
        super.delete()
        while (curr !== null) {
            curr.checkAndRotate()
            curr = curr.parent
        }
    }
}

//////////////////// test
// var nodes = [
//     new AVLTreeNode(1),
//     new AVLTreeNode(2),
//     new AVLTreeNode(2),
//     new AVLTreeNode(3),
//     new AVLTreeNode(4),
//     new AVLTreeNode(5),
//     new AVLTreeNode(6),
//     new AVLTreeNode(7),
// ]

// var node = AVLTreeNode.buildFromArray(nodes)

// console.log(node.getRoot().breadthFirstTraverse().map(node => node.key))
// console.log(node.getRoot().preOrderTraverseWithStack().map(node => node.key))
// console.log(node.getRoot().inOrderTraverseWithRecursion().map(node => node.key))
// console.log(node.getRoot().getNodeByKey(2).draw())
// console.log(node.getRoot().draw())
// node.getRoot().getNodeByKey(1).delete()
// console.log(node.getRoot().draw())
// node.getRoot().getNodeByKey(2).delete()
// console.log(node.getRoot().draw())




module.exports = AVLTreeNode





