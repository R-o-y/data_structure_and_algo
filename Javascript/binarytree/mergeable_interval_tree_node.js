var IntervalTreeNode = require('./interval_tree_node.js')


class MergeableIntervalTreeNode extends IntervalTreeNode {
    insert(newNode) {
        var node = newNode
        var intersectedNodes = this.searchIntersectedNodes(node.low, node.high)
        for (var n of intersectedNodes)
            n.delete()

        node.low = node.key = Math.min(...intersectedNodes.map(n => n.low).concat(node.low))
        node.high = node.subtreeHighest = Math.max(...intersectedNodes.map(n => n.high).concat(node.high))
        super.insert(node)
    }    
}


////////////////////// test
var nodes = [
    new MergeableIntervalTreeNode(999, 999),
    new MergeableIntervalTreeNode(1, 6),
    new MergeableIntervalTreeNode(2, 3),
    new MergeableIntervalTreeNode(2, 6),
    new MergeableIntervalTreeNode(3, 4),
    new MergeableIntervalTreeNode(4, 9),
    new MergeableIntervalTreeNode(5, 12),
    new MergeableIntervalTreeNode(6, 7),
    new MergeableIntervalTreeNode(7, 8),
    new MergeableIntervalTreeNode(666, 777),
    new MergeableIntervalTreeNode(186, 28),
]

var node = MergeableIntervalTreeNode.buildFromArray(nodes)
console.log(node.getRoot().draw())



module.exports = MergeableIntervalTreeNode




