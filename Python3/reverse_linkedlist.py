class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

    def to_list(self):
        eles = []
        node = self
        while node is not None:
            eles.append(node.val)
            node = node.next
        return eles
    
    def reverse(self, k):
        """
        reverse the next k elements (including the current one), return the new head
        if there is less than k elements left, do nothing
        """
        # check at least k elements
        count = 1
        curr = self
        while curr.next is not None and count < k:
            curr = curr.next
            count += 1
        if count < k:
            return self
        last_next = curr.next

        # reverse
        count = 0
        curr = last_next
        next = self
        while count < k:
            next_next = next.next
            next.next = curr
            curr = next
            next = next_next
            count += 1
        return curr

    @classmethod
    def from_list(cls, l):
        if len(l) == 0:
            return None
        head = Node(l[0])
        current = head
        for ele in l[1:]:
            current.next = Node(ele)
            current = current.next
        return head


def reverse_linkedlist(head):
    """
    reverse the singly linked list and return the new head node
    """
    curr = None
    next = head
    while next is not None:
        next_next = next.next
        next.next = curr
        curr = next
        next = next_next
    return curr


# test
l = Node.from_list([1,2,3,4,5])
l.next = l.next.reverse(3)
print(l.to_list())
