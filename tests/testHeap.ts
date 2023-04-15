// ts-node --esm testHeap.ts

import { Heap } from "../heap";
import { assert, quietAssert } from "./miniTest";

// Comparison function for a number Min-Heap
const minNumHeap = (a: number, b: number): number => {
  if (a < b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
};

// Comparison function for JS array.sort matching minNumHeap
const sortLtoG = (a: number, b: number): number => {
  return -1 * minNumHeap(a, b);
};

// Generates random numbers between -10 and 10
const randNums = (length: number, acc: number[] = []): number[] => {
  if (length <= 0) {
    return acc;
  }
  const num = Math.floor(Math.random() * 42) - 20;
  acc.push(num);
  return randNums(length - 1, acc);
};

const testNumMinHeap = () => {
  console.log("\nTesting number heap:");
  const hp = new Heap(minNumHeap);
  const sample: number[] = randNums(20);

  assert(hp.size() === 0, "create heap");

  sample.forEach((num: number) => hp.push(num));

  assert(hp.size() === sample.length, "fill heap");

  // Now that the numbers are inserted, sort the array and test for correctness
  sample.sort(sortLtoG);

  assert(hp.peek() === sample[0], "peek");

  sample.forEach((num: number) =>
    quietAssert(hp.pop() === num, `popped ordered values ${num}`)
  );

  assert(hp.size() === 0, "all values popped in priority order");
};

testNumMinHeap();
