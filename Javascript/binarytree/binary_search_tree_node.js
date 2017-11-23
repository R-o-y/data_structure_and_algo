var BinaryTreeNode = require('./binary_tree_node.js')


class BinarySearchTreeNode extends BinaryTreeNode {
    setLeftChild(node) {
        this.leftChild = node
        if (node !== null)
            node.parent = this
    }

    setRightChild(node) {
        this.rightChild = node
        if (node !== null)
            node.parent = this
    }
    
    insert(key) {
        if (key <= this.key) {
            if (this.leftChild === null)
                this.setLeftChild(new BinarySearchTreeNode(key))
            else
                this.leftChild.insert(key)
        } else {
            if (this.rightChild === null)
                this.setRightChild(new BinarySearchTreeNode(key))
            else
                this.rightChild.insert(key)
        }
    }
}


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

    insert(key) {
        if (key <= this.key) {
            if (this.leftChild === null) {
                this.setLeftChild(new AVLTreeNode(key))
                this.updateHeightToRoot()
                this.checkAndRotate()
            } else
                this.leftChild.insert(key)
        } else {
            if (this.rightChild === null) {
                this.setRightChild(new AVLTreeNode(key))
                this.updateHeightToRoot()
                this.checkAndRotate()
            } else
                this.rightChild.insert(key)
        } 
    }
}

////////////////////// test
var node = new AVLTreeNode(1)
node.getRoot().insert(2)
node.getRoot().insert(3)
node.getRoot().insert(4)
node.getRoot().insert(5)
node.getRoot().insert(6)
node.getRoot().insert(7)


console.log(node.getRoot().breadthFirstTraverse().map(node => node.key))
console.log(node.getRoot().preOrderTraverseWithStack().map(node => node.key))
console.log(node.getRoot().inOrderTraverseWithRecursion().map(node => node.key))
console.log(node.getRoot().draw())






