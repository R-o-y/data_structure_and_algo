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

    getSmallestInSubstree() {
        var node = this
        while (node.leftChild !== null)
            node = node.leftChild
        return node
    }

    getLargestInSubstree() {
        var node = this
        while (node.rightChild !== null)
            node = node.rightChild
        return node
    }
    
    /**
     * return the next node in in-order traversal
     */
    inOrderNext() {
        if (this.rightChild !== null)
            return this.rightChild.getSmallestInSubstree()
        var node = this
        while (node.parent.rightChild === node) {
            node = node.parent
            if (node.parent === null)
                return null
        }
        return node.parent
    }

    /**
     * return the pervious node in in-order traversal
     */
    inOrderPrevious() {
        if (this.leftChild !== null)
            return this.leftChild.getLargestInSubstree()
        var node = this
        while (node.parent.leftChild === node) {
            node = node.parent
            if (node.parent === null)
                return null
        }
        return node.parent
    }

    preOrderNext() {
        if (this.leftChild !== null) {
            return this.leftChild
        } else if (this.leftChild === null && this.rightChild !== null) {
            return this.rightChild
        } else if (this.leftChild === null && this.rightChildi === null) {
            var curr = this
            while(curr.parent !== null) {
                if (curr.parent.left === curr && curr.parent.right !== null)
                    return curr.parent.right
                curr = curr.parent
            }
            return null
        }
    }

    insert(node) {
        if (node.key <= this.key) {
            if (this.leftChild === null)
                this.setLeftChild(node)
            else
                this.leftChild.insert(node)
        } else {
            if (this.rightChild === null)
                this.setRightChild(node)
            else
                this.rightChild.insert(node)
        }
    }

    /**
     * delete the current node, if it is NOT the root node
     */
    delete() {
        if (this.leftChild !== null && this.rightChild !== null) {
            var inOrderNext = this.inOrderNext()
            var originalParent = this.parent
            var originalLeftChild = this.leftChild
            var originalRightChild = this.rightChild
            Object.assign(this, inOrderNext)
            this.parent = originalParent
            this.leftChild = originalLeftChild
            this.rightChild = originalRightChild
            inOrderNext.delete()
        } else if (this.parent !== null &&  this.leftChild === null && this.rightChild === null) {
            if (this.parent.leftChild === this)
                this.parent.leftChild = null
            else 
                this.parent.rightChild = null
            this.parent = null
        } else if (this.parent !== null) {
            var orphan = this.rightChild !== null ? this.rightChild : this.leftChild
            if (this.parent.leftChild === this)
                this.parent.setLeftChild(orphan)
            else
                this.parent.setRightChild(orphan)
            this.parent = null
        } else {
            console.log('in this case, delete operation requires the change of the root pointer')
        }
    }

    /**
     * get the reference of the node whose key equals the input one
     * if there are multiple such nodes, 
     * return the first one according to pre-order tranversal
     * @param {*} key 
     */
    getNodeByKey(key) {
        if (this.key === key)
            return this
        if (this.leftChild !== null && this.leftChild.getNodeByKey(key) !== null)
            return this.leftChild.getNodeByKey(key)
        if (this.rightChild !== null && this.rightChild.getNodeByKey(key) !== null)
            return this.rightChild.getNodeByKey(key)
        return null
    }

    static buildFromArray(nodeArray) {
        var node = nodeArray[0]
        for (var n of nodeArray.slice(1, nodeArray.length))
            node.getRoot().insert(n)
        return node.getRoot()
    }
}


module.exports = BinarySearchTreeNode





















