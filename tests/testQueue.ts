import { Queue } from "../queue";
import { assert, quietAssert } from "../utils/miniTest";

const testQueue = () => {
  const queue = new Queue<number>();

  // Test size
  assert(queue.size() === 0, "initializes at size 0");

  // queueIO: cycles elements in and out of the queue
  const queueIO = () => {
    const len: number = Math.floor(Math.random() * 50);
    const testData: number[] = Array.from({ length: len }, () =>
      Math.floor(Math.random() * 100)
    );

    // Test push and peek
    for (const el of testData) {
      queue.push(el);
      quietAssert(queue.peek() === testData[0], `peek expected ${testData[0]}`);
    }
    assert(
      queue.size() === testData.length,
      `push and peek inserted and read ${queue.size()} elements correctly`
    );
    let counter = 0;

    // Test pop
    for (const el of testData) {
      counter += 1;
      quietAssert(queue.pop() === el, `pop expected ${el}`);
    }
    assert(queue.size() === 0, "popped values in correct order");
  };

  // Fill and empty the queue twice to ensure it rebalances correctly.
  queueIO();
  queueIO();
};

testQueue();
