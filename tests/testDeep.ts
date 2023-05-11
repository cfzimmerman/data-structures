import { deepAny } from "../utils/deep";
import { assert } from "../utils/miniTest";

const startValue = 5;
const endValue = -12;
let tstVar = startValue;
const tstObj1 = {
  value: startValue,
};
const tstObj2 = {
  subfield1: {
    subfield2: {
      value: startValue,
    },
  },
};

const testDeep = () => {
  // Test single variable
  assert(tstVar === startValue, "initialized var");
  const copyTstVar = deepAny(tstVar);
  tstVar = endValue;
  assert(tstVar === endValue, "changed var");
  assert(copyTstVar === startValue, "copied value didn't change");

  // Test single-depth object
  assert(tstObj1.value === startValue, "initialized shallow object");
  const copyTstObj1 = deepAny(tstObj1);
  tstObj1.value = endValue;
  assert(tstObj1.value === endValue, "changed field");
  assert(copyTstObj1.value === startValue, "copied object didn't change");

  // Test nested object
  assert(
    tstObj2.subfield1.subfield2.value === startValue,
    "initialized deep object"
  );
  const copyTstObj2 = deepAny(tstObj2);
  tstObj2.subfield1.subfield2.value = endValue;
  assert(tstObj2.subfield1.subfield2.value === endValue, "changed deep field");
  assert(
    copyTstObj2.subfield1.subfield2.value === startValue,
    "copied object didn't change"
  );
};

testDeep();
