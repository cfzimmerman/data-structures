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

  // Re-fill list for testing other methods
  testNums.forEach((num: number) => {
    testList.pushTail(num);
  });

  // Test foldLeft
  const plusAcc = (x: number, y: number) => x + y;
  assert(
    testList.foldLeft(plusAcc, 0) === testNums.reduce(plusAcc, 0),
    "foldLeft (+)"
  );
  const stringCatAcc = (acc: string, val: number) => acc + JSON.stringify(val);
  assert(
    testList.foldLeft(stringCatAcc, "") === testNums.reduce(stringCatAcc, ""),
    "foldLeft int to string"
  );

  // Test map
  const strMap = (el: number) => JSON.stringify(el);
  let mapInd = 0;
  for (const el of testList.map(strMap)) {
    quietAssert(
      el === strMap(testNums[mapInd]),
      `strMap unexpectedly received ${el}`
    );
    mapInd++;
  }
  // Sending a message after the successful quiet assertions
  assert(true, "map int to string");

  // Test toArray
  assert(Array.isArray(testList.toArray()), "toArray returns valid array");
  assert(
    JSON.stringify(testList.toArray()) === JSON.stringify(testNums),
    "generated array has correct values"
  );

  // Test reverse
  assert(
    JSON.stringify(testList.reverse().toArray()) ===
      JSON.stringify(testNums.reverse()),
    "reverse first"
  );
  assert(
    JSON.stringify(testList.reverse().toArray()) ===
      JSON.stringify(testNums.reverse()),
    "reverse second"
  );

  // Test includes
  assert(!testList.includes(999999999), "includes, doesn't contain");
  assert(testList.includes(testNums[0]), "includes, does contain");

  // Test at
  for (let cursor = 0; cursor < testNums.length; cursor++) {
    quietAssert(
      testList.at(cursor) === testNums[cursor],
      `testList.at(${cursor}) failed`
    );
  }
  assert(testList.at(0) === testNums[0], "at returns correct values");
};

testList();
