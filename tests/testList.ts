import { List } from "../list";
import { deepReverse } from "../utils/deep";
import { assert, quietAssert } from "../utils/miniTest";

const testList = () => {
  const len: number = 20;
  const testNums: number[] = Array.from({ length: len }, () =>
    Math.floor(Math.random() * 100)
  );
  const testList = new List<number>();

  // Test pushHead, size, and peekHead
  testNums.forEach((num: number, index: number) => {
    testList.pushHead(num);
    quietAssert(testList.peekHead() === num, `peek expected ${num}`);
    quietAssert(testList.size() === index + 1, `size expected ${index + 1}`);
  });
  assert(testList.size() === len, "pushHead adds values");
  assert(
    testList.peekHead() === testNums[testNums.length - 1],
    `peekHead returns ${testList.peekHead()}`
  );

  const revSample = deepReverse(testNums);

  // Test popHead
  revSample.forEach((num: number) => {
    quietAssert(num === testList.popHead(), `popHead expected ${num}`);
  });
  assert(testList.size() === 0, "popHead removes values");

  // Test pushTail and peekTail
  testNums.forEach((num: number) => {
    testList.pushTail(num);
    quietAssert(testList.peekTail() === num, `peek expected ${num}`);
  });
  assert(testList.size() === len, "pushTail adds values");
  assert(
    testList.peekTail() === testNums[testNums.length - 1],
    `peekTail returns ${testList.peekTail()}`
  );

  // Test popTail
  revSample.forEach((num: number) => {
    quietAssert(num === testList.popTail(), `popTail expected ${num}`);
  });
  assert(testList.size() === 0, "popTail removes values");
};

testList();
