import { Stack } from "../stack";
import { assert, quietAssert } from "../utils/miniTest";

const testStack = () => {
  const testData: string[] = "Basic TS Stack test 😄"
    .replace(/\s/g, "")
    .split("");
  const stack = new Stack<string>();

  // Test size
  assert(stack.size() === 0, "empty stack has size 0");

  // Test push and peek
  for (const el of testData) {
    stack.push(el);
    quietAssert(stack.peek() === el, `push / peek. Peek expected ${el}`);
  }
  assert(
    stack.size() === testData.length,
    `pust / peek added and checked ${stack.size()} elements correctly`
  );

  // Test pop
  for (const el of testData.reverse()) {
    quietAssert(stack.pop() === el, `pop expected ${el}`);
  }
  assert(stack.size() === 0, "popped elements in correct order");
};

testStack();
