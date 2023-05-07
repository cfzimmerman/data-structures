// ts-node --esm testHeap.ts

import { Heap } from "../heap";
import { assert, quietAssert } from "../utils/miniTest";

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

// Can be used by JS array.sort() to order numbers least to greatest
const maxNumHeap = (a: number, b: number): number => {
  return -1 * minNumHeap(a, b);
};

// Generates random numbers between
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
  const SAMPLE_SIZE = 50;
  const minHp = new Heap(minNumHeap);
  const sample: number[] = randNums(SAMPLE_SIZE);
  assert(minHp.size() === 0, "create min heap");

  sample.forEach((num: number) => {
    minHp.push(num);
  });

  assert(minHp.size() === sample.length, "fill heap");

  // Now that the numbers are inserted, sort the array and test for correctness
  sample.sort(maxNumHeap);

  assert(minHp.peek() === sample[0], "peek");

  sample.forEach((num: number) => {
    quietAssert(minHp.pop() === num, `popped ordered values ${num}`);
  });

  assert(minHp.size() === 0, "all values popped in priority order");

  // Test replace by finding the smallest five elements in the sample
  const maxHp = new Heap(maxNumHeap);
  const newSample: number[] = randNums(SAMPLE_SIZE);
  assert(maxHp.size() === 0, "create max heap");
  const maxHpSizeLimit = 5;
  newSample.forEach((num: number) => {
    // Continually replace the largest element in the limited-size heap
    // Leaves only the smallest elements
    if (maxHp.size() < maxHpSizeLimit) {
      return maxHp.push(num);
    }
    maxHp.replace(num);
  });
  assert(maxHp.size() === maxHpSizeLimit, "heap is correct size");
  newSample.sort(maxNumHeap);
  const min5 = new Set<number>(newSample.slice(0, 5));
  for (let ct = 0; ct < maxHpSizeLimit; ct++) {
    quietAssert(min5.has(maxHp.pop()), "maxHp contains minimum values");
  }
  assert(maxHp.size() === 0, "heap contained all expected values");
};

testNumMinHeap();
