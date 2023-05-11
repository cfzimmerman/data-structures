/*
  These functions are helpers for working with deep copies of
  native JS data structures.
*/

/* genericEntries: helper that returns TS-typed Object.entries. */
export const genericObjectEntries = <T extends Record<string, any>>(
  obj: T
): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

/* deepReverse: creates a reversed deep copy of the input array */
export const deepReverse = <T>(arr: T[]): T[] => {
  return arr.reduceRight((acc: T[], curr: T) => {
    acc.push(curr);
    return acc;
  }, []);
};

/* deepObj: creates a deep copy of an object. If child values are 
   also objects, recursively deep copies them too. */
export const deepObj = <T extends object>(obj: T): T => {
  const res = Object.assign({}, obj);
  genericObjectEntries(res).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      res[key] = deepObj(value);
    }
  });
  return res;
};

/* deepAny: creates a deep copy of any variable. */
export const deepAny = <T>(val: T): T => {
  const copy = deepObj({ val });
  return copy.val;
};
