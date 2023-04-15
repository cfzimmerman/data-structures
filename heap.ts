/*

HEAP
2023, Cory Zimmerman

Stores an ordered collection of elements by priority with the highest-priority 
element being at the top. This heap is implemented as an array-based binary tree.

Attributes:
  - Constant time lookup of the highest priority element
  - O(log(n)) insertion [worst case]
  - O(log(n)) deletion of the top element in the heap [worst case]

Heap Invariant: The priority of a node is always greater than or equal the priority of the nodes below it.

*/

/* 
ComparePriority:
Returns -1 if a's priority is less than b, 0 if a's priority is equal to b, 1 if a's 
priority greater than b.
The top element of the heap has compare 1 or 0 over every other element in the heap.
Think of compare in terms of priority. If a has higher priority than b, return 1.

Example compare function for a number Min-Heap:
const compare = (a: number, b: number): number => {
  if (a < b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
};
*/
type ComparePriority<T> = (a: T, b: T) => number;

export class Heap<T> {
  private heap: T[];
  private compare: ComparePriority<T>;
  constructor(compare: ComparePriority<T>) {
    this.heap = [];
    this.compare = compare;
  }

  /* Returns the size of the heap */
  size() {
    return this.heap.length;
  }

  /* Adds an element to the heap. 
  ~O(log(n)) time complexity */
  push(el: T): void {
    this.heap.push(el);
    this.bubbleUp(this.size() - 1);
  }

  /* Non-destructively returns the highest priority element in the heap. 
  O(1) time complexity */
  peek(): T {
    if (this.size() === 0) {
      throw "Cannot peek empty heap";
    }
    return this.heap[0];
  }

  /* Removes the highest priority element from the heap and returns it. 
  ~O(log(n)) time complexity */
  pop(): T {
    if (this.size() === 0) {
      throw "Cannot pop empty heap";
    }
    const top: T = this.heap[0];
    if (this.size() === 1) {
      this.empty();
      return top;
    }
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();
    this.bubbleDown(0);
    return top;
  }

  /* Removes all elements from the heap */
  empty(): void {
    this.heap = [];
  }

  /* Returns the index of the parent node */
  private parent(current: number): number {
    if (current <= 0) {
      throw `No parent for index ${current}`;
    }
    return Math.floor(current / 2);
  }

  /* Returns the index of the left child node */
  private left(current: number): number {
    return 2 * current + 1;
  }

  /* Returns the index of the right child node */
  private right(current: number): number {
    return 2 * current + 2;
  }

  /* Returns whether or not an index represents a node in the tree */
  private inHeap(index: number): boolean {
    return index >= 0 && index < this.size();
  }

  /* Given the indices of two nodes, swaps them */
  private swap(index1: number, index2: number): void {
    if (!this.inHeap(index1) || !this.inHeap(index2)) {
      throw `Indices out of bounds: swap ${index1} and ${index2}`;
    }
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  /* Given a node a some point below the root of the tree, 
      compare it with its parent and swap if it the lower node 
      has higher priority. Perform recursively until the heap 
      invariant is satisfied. */
  private bubbleUp(index: number): void {
    if (!this.inHeap(index)) {
      throw `Bubble up node ${index} not in heap`;
    }
    if (index === 0) {
      // Highest priority element can't be bubbled up any further
      return;
    }
    const parentIndex = this.parent(index);
    if (this.compare(this.heap[index], this.heap[parentIndex]) > 0) {
      // Current element's priority is higher than its parent's priority. Bubble up
      this.swap(index, parentIndex);
      return this.bubbleUp(parentIndex);
    }
  }

  /* Given a node on the tree, compare it with its children (if any).
      If one or both of the children has higher priority, swap with 
      the highest-priority child. Perform recursively until the 
      heap invariant is satisfied.
  */
  private bubbleDown(index: number): void {
    if (!this.inHeap(index)) {
      throw `Cannot reach node ${index}`;
    }
    const leftIndex = this.left(index);
    const rightIndex = this.right(index);
    if (!this.inHeap(leftIndex) && !this.inHeap(rightIndex)) {
      // Current node is a leaf node, we'll leave the value where it is right now
      return;
    }
    if (!this.inHeap(rightIndex)) {
      // The left child is the final node in the tree
      if (this.compare(this.heap[index], this.heap[leftIndex]) < 0) {
        // Swap if the left child has greater priority than the current node
        this.swap(index, leftIndex);
      }
      // We don't need to recursively check the left child because it's the last in the tree
      return;
    }
    // The current node is a branch with two children
    const compareLeft = this.compare(this.heap[index], this.heap[leftIndex]);
    const compareRight = this.compare(this.heap[index], this.heap[rightIndex]);
    const compareLR = this.compare(this.heap[leftIndex], this.heap[rightIndex]);
    if (compareLeft < 0 && compareLR >= 0) {
      // The left child is greater than the parent and the right child
      this.swap(index, leftIndex);
      return this.bubbleDown(leftIndex);
    }
    if (compareRight < 0 && compareLR <= 0) {
      // The right child is greater than the parent and the left child
      this.swap(index, rightIndex);
      return this.bubbleDown(rightIndex);
    }
    // The parent has greater priority than both children
  }
}
