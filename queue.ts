/*
 * QUEUE
 * 2023, Cory Zimmerman
 *
 * Stores a collection of elements by insertion order obeying the
 * Queue invariant.
 *
 * Attributes:
 * - Constant time push, size
 * - Amortized constant time pop (for this implementation)
 *
 * Queue invariant: Older elements have higher priority. First
 * in, first out.
 *
 * Design note: Using my Double Linked List module would make
 * for a practically more efficient queue. However, this simple,
 * stack-based queue prioritizes brevity and has no dependencies.
 *
 */

export class Queue<T> {
  // All elements exit through the front
  front: T[] = [];
  // All elements enter through the back
  back: T[] = [];

  /* size: returns the number of elements in the queue */
  size(): number {
    return this.front.length + this.back.length;
  }

  /* push: adds an element to the queue */
  push(el: T): Queue<T> {
    this.back.push(el);
    return this;
  }

  /* pop: removes and returns the next element in the queue.
   * May throw error if queue is empty. */
  pop(): T {
    this.checkRebalance();
    const res = this.front.pop();
    if (!res) {
      throw "cannot pop empty queue";
    }
    return res;
  }

  /* peek: returns the next element in the queue without making
   * any modifications to the queue.
   * May throw error if queue is empty. */
  peek(): T {
    this.checkRebalance();
    return this.front[this.front.length - 1];
  }

  /* print: console logs the queue (for debugging purposes) */
  print(): void {
    console.log("front: ", this.front);
    console.log("back: ", this.back);
  }

  /* checkRebalance: convenience wrapper around rebalance for greater
   * conciseness in peek and pop. */
  private checkRebalance(): void {
    if (this.front.length === 0) {
      this.rebalance();
    }
  }

  /* rebalance: reverses the back onto the empty front.
   * This puts the oldest elements at the end of the front,
   * where they can be popped from the array in constant
   * time by insertion order.
   * May throw error if queue is empty. */
  private rebalance(): void {
    if (this.size() === 0) {
      throw "cannot retrieve from empty queue";
    }
    // Front is of size 0, so concat is trivial. But, it creates
    // a new array, which maintains the values after back is cleared.
    this.front = this.front.concat(this.back.reverse());
    this.back = [];
  }
}
