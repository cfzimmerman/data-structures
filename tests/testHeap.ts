// ts-node --esm testHeap.ts

import { Heap } from "./heap";

const minNumHeap = (a: number, b: number) => {
  if (a < b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
};

const randNums = (length: number, acc: number[] = []): number[] => {
  if (length <= 0) {
    return acc;
  }
  const num = Math.floor(Math.random() * 21) - 10;
  acc.push(num);
  return randNums(length - 1, acc);
};

const hp = new Heap(minNumHeap);

console.log(randNums(10));

// hp.print();
