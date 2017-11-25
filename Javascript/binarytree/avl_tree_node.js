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
        if (this.parent === null) return
        
        if (this.parent.leftChild === this) {  // this is left child
            var siblingHeight = this.parent.rightChild === null ? -1 : this.parent.rightChild.height
            if (this.height > siblingHeight + 1 && this.getLeftChildHeight() >= this.getRightChildHeight())  // non-zigzag
                this.parent.rightRotate()
            else if (this.height > siblingHeight + 1) {  // zigzag
                this.leftRotate()
                this.parent.parent.rightRotate()
            } else this.parent.checkAndRotate()
        } else {  // this is right child
            var siblingHeight = this.parent.leftChild === null ? -1 : this.parent.leftChild.height
            if (this.height > siblingHeight + 1 && this.getRightChildHeight() >= this.getLeftChildHeight()) // non-zigzag
                this.parent.leftRotate()
            else if (this.height > siblingHeight + 1) {  // zigzag
                this.rightRotate()
                this.parent.parent.leftRotate()
            } else this.parent.checkAndRotate()
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
}

////////////////////// test
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
// console.log(node.getNodeByKey(2).draw())
// console.log(node.getRoot().draw())




module.exports = AVLTreeNode







