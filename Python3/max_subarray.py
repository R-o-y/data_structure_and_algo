"""
https://leetcode.com/problems/maximum-subarray/description/

Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.
"""


import math


# solution 1 using divide and conquer
# time complexity: T(n) = 2T(n/1) + n --> nlgn
class Solution1(object):
    def max_pass_middle(self, nums, left, right, middle):
        max_left_side = 0
        max_right_side = 0
        
        sum = 0
        for i in range(middle + 1, right + 1):
            sum += nums[i]
            max_right_side = max(sum, max_right_side)
        
        sum = 0
        for i in range(middle - 1, left - 1, -1):
            sum += nums[i]
            max_left_side = max(sum, max_left_side)
        
        return max_left_side + max_right_side + nums[middle]
    
    def max_subarray_recur(self, nums, left, right):
        if left > right:
            return float('-inf')  # do NOT regard empty subset as sum up to 0
        middle = int(math.floor((left + right) / 2))
        max_left = self.max_subarray_recur(nums, left, middle - 1)
        max_right = self.max_subarray_recur(nums, middle + 1, right)
        max_pass_middle = self.max_pass_middle(nums, left, right, middle)
        return max(max_left, max_right, max_pass_middle)
    
    def maxSubArray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        return self.max_subarray_recur(nums, 0, len(nums) - 1)
    

# solution 2 using dynamic programming
# time complexity: n
class Solution2(object):
    def max_subarray_recur(self, nums, right):
        if self.max_subarray_sum_end_at[right] is None: 
            self.max_subarray_sum_end_at[right] = max(
                self.max_subarray_recur(nums, right - 1) + nums[right], 
                nums[right]
            )
        return self.max_subarray_sum_end_at[right]
    
    def maxSubArray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        self.max_subarray_sum_end_at = [None for i in range(len(nums))]
        self.max_subarray_sum_end_at[0] = nums[0]
        for i in range(len(nums)):
            self.max_subarray_sum_end_at[i] = self.max_subarray_recur(nums, i)
        return max(self.max_subarray_sum_end_at)
















