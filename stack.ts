/*
 * STACK
 * 2023, Cory Zimmerman
 *
 * Stores a collection of elements ordered by insertion obeying
 * the Stack invariant.
 *
 * Attributes:
 * - Constant time push, pop, and peek.
 *
 * Stack invariant: Newer elements have higher priority. Last in, first out.
 *
 */

// This is of-course very simple, but it was a fun exercise.
export class Stack<T> {
  private st: T[] = [];

  /* size: returns the number of elements in the stack */
  size(): number {
    return this.st.length;
  }

  /* push: adds an element to the stack */
  push(el: T): Stack<T> {
    this.st.push(el);
    // Returns itself for easy command chaining
    return this;
  }

  /* pop: removes the top element from the stack and returns it.
   * May throw an error if the stack is empty. */
  pop(): T {
    const res = this.st.pop();
    if (typeof res === "undefined") {
      throw "cannot pop empty stack";
    }
    return res;
  }

  /* peek: returns the top element in the stack. No modifications are made.
   * May throw an error if the stack is empty. */
  peek(): T {
    if (this.size() === 0) {
      throw "cannot peek empty stack";
    }
    return this.st[this.st.length - 1];
  }
}
