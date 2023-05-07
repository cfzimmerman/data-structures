/*

size
pushHead
popHead
peekHead
popTail
peekTail
pushTail 

fold
map
includes
reverse
serialize
at

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

  size(): number {
    return this.sz;
  }

  empty(): void {
    this.head = null;
    this.tail = this.head;
    this.sz = 0;
  }

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

  peekHead(): T {
    if (!this.head) {
      throw "cannot peek empty list";
    }
    return this.head.val;
  }

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

  peekTail(): T {
    if (!this.tail) {
      throw "cannot peek empty list";
    }
    return this.tail.val;
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
