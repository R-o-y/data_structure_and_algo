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
    
    inOrderNext() {
        if (this.rightChild !== null)
            return this.rightChild.getSmallestInSubstree()
        var node = this
        while (node.parent.rightChild === node)
            node = node.parent
        return node.parent
    }

    inOrderPrevious() {
        if (this.leftChild !== null)
            return this.leftChild.getLargestInSubstree()
        var node = this
        while (node.parent.leftChild === node)
            node = node.parent
        return node.parent
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
     * get the reference of the node whose key equals the input one
     * if there are multiple such nodes, 
     * return the first one according to in order tranversal (leftmost one)
     * @param {*} key 
     */
    getNodeByKey(key) {
        if (this.key === key)
            return this
        return this.leftChild.getNodeByKey(key)
        return this.rightChild.getNodeByKey(key)
    }

    static buildFromArray(nodeArray) {
        var node = nodeArray[0]
        for (var n of nodeArray.slice(1, nodeArray.length))
            node.getRoot().insert(n)
        return node.getRoot()
    }
}


module.exports = BinarySearchTreeNode











