""" 
                            READ THIS FIRST
                            
python has built-in implementation of binary search, which is in `bisect` module

https://docs.python.org/3.6/library/bisect.html?highlight=bisect#module-bisect
"""

def search_left_bound(array, target_value):
    left = -1 
    right = len(array) - 1
    while left < right - 1:
        middle = int((left + right) / 2)
        if target_value <= array[middle]:
            right = middle
        else:
            left = middle
    return right  # `right` is the leftmost index >= target_value, `left` is the rightmost index < target_value


def search_right_bound(array, target_value):
    left = 0
    right = len(array)
    while left < right - 1:
        middle = int((left + right) / 2)
        if target_value < array[middle]:
            right = middle
        else:
            left = middle
    return left  # `left` is the rightmost index <= target_value, `right` is the leftmost index > target_value


















