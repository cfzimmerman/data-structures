/*
 *
 * LIST
 * 2023, Cory Zimmerman
 *
 * Stores a mono-type collection of elements. Because the
 * list is double-linked, it can also be used as a double
 * ended queue.
 *
 * Supports iteration, fold, reverse, map, and more.
 *
 * Attributes:
 * - Constant time head and tail CRUD
 * - Linear time random lookup
 *
 */

type LNode<T> = {
  val: T;
  prev: LNode<T>;
  next: LNode<T>;
} | null;

export class List<T> {
  private sz: number = 0;
  private head: LNode<T> = null;
  private tail: LNode<T> = this.head;

  /* iterator: Enables for (const node of list) ... iteration */
  [Symbol.iterator](): Iterator<T> {
    let current: LNode<T> = this.head;
    return {
      next: () => {
        if (!current) {
          return { value: null, done: true };
        }
        const value = current.val;
        current = current.next;
        return { value, done: false };
      },
    };
  }

  /* size: returns the number of nodes in the list */
  size(): number {
    return this.sz;
  }

  /* empty: removes all nodes from a list of any size */
  empty(): void {
    this.head = null;
    this.tail = this.head;
    this.sz = 0;
  }

  /* pushHead: adds a node to the front of the list */
  pushHead(val: T): void {
    this.sz += 1;
    if (!this.head) {
      return this.singleton(val);
    }
    const newNode: LNode<T> = {
      val,
      prev: null,
      next: this.head,
    };
    this.head.prev = newNode;
    this.head = newNode;
  }

  /* popHead: removes and returns the first node in the list.
   * May thow an error if the list is empty. */
  popHead(): T {
    if (this.size() === 0 || !this.head) {
      throw "cannot pop from empty list";
    }
    this.sz -= 1;
    const oldHd = this.head;
    if (!this.head.next) {
      this.empty();
      return oldHd.val;
    }
    this.head.next.prev = null;
    this.head = this.head.next;
    return oldHd.val;
  }

  /* peekHead: returns the value of the first node in the list.
   * May throw an error if the list is empty. */
  peekHead(): T {
    if (!this.head) {
      throw "cannot peek empty list";
    }
    return this.head.val;
  }

  /* pushTail: appends a value to the end of the list. */
  pushTail(val: T): void {
    this.sz += 1;
    if (!this.head || !this.tail) {
      // The !tail is logically unnecessary but informs the TS interpreter
      return this.singleton(val);
    }
    const newNode: LNode<T> = {
      val,
      prev: this.tail,
      next: null,
    };
    this.tail.next = newNode;
    this.tail = newNode;
  }

  /* popTail: removes and returns the last value in the list.
   * May throw an error if the list is empty. */
  popTail(): T {
    if (this.size() === 0 || !this.tail) {
      throw "cannot pop from empty list";
    }
    this.sz -= 1;
    const oldTl = this.tail;
    if (!this.tail.prev) {
      this.empty();
      return oldTl.val;
    }
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    return oldTl.val;
  }

  /* peekTail: returns the last value in the list.
   * May throw an error if the list is empty. */
  peekTail(): T {
    if (!this.tail) {
      throw "cannot peek empty list";
    }
    return this.tail.val;
  }

  /* fold_left: collapses the list into an accumulator by an input function. */
  foldLeft<V>(fun: (acc: V, el: T) => V, acc: V, start = this.head): V {
    if (start === null) {
      return acc;
    }
    const newAcc = fun(acc, start.val);
    return this.foldLeft(fun, newAcc, start.next);
  }

  /* map: returns a new list with each element defined by a function
   * mapping from the original list. */
  map<V>(fun: (el: T) => V): List<V> {
    const newList = new List<V>();
    for (const node of this) {
      newList.pushTail(fun(node));
    }
    return newList;
  }

  /* reverse: reverses the list in-place. Returns the modified list. */
  reverse(): List<T> {
    const oldHead = this.head;
    this.head = this.tail;
    this.tail = oldHead;
    // rev is a recursive helper function that swaps the relations of nodes
    const rev = (head: LNode<T>): void => {
      if (!head) {
        return;
      }
      const oldNext = head.next;
      head.next = head.prev;
      head.prev = oldNext;
      rev(oldNext);
    };
    rev(oldHead);
    return this;
  }

  /* toArray: creates an array from the list. */
  toArray(): T[] {
    const res: T[] = [];
    for (const value of this) {
      res.push(value);
    }
    return res;
  }

  /* includes: returns whether or not a value is currently in the list */
  includes(el: T): boolean {
    for (const value of this) {
      if (value === el) {
        return true;
      }
    }
    return false;
  }

  /* at: returns the value at the given index.
   * May throw an error if the index is out of bounds.*/
  at(index: number): T {
    if (index < 0 || index >= this.size()) {
      throw "at: invalid index, out of bounds";
    }
    const find = (
      mode: "forward" | "backward",
      head: LNode<T>,
      index: number
    ): T => {
      if (head === null || index < 0) {
        throw "findForward went out of bounds";
      }
      if (index === 0) {
        return head.val;
      }
      const next = mode === "forward" ? head.next : head.prev;
      return find(mode, next, index - 1);
    };
    // If the desired index is in the second half of the list, start
    // at the back and work forward. Else, start at the front.
    if (index / 2 > this.size() / 2) {
      return find("backward", this.tail, index);
    }
    return find("forward", this.head, index);
  }

  /* singleton: creates a new list with only one node. */
  private singleton(val: T): void {
    const newNode: LNode<T> = {
      val,
      prev: null,
      next: null,
    };
    this.head = newNode;
    this.tail = this.head;
    return;
  }
}
