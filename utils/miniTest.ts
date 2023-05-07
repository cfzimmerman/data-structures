/*
In the spirit of DIY, this is a mini testing function. I don't really
need anything more, and I'd rather not introduce packages if I can help it.
*/

export const quietAssert = (condition: boolean, message: string) =>
  assert(condition, message, true);

export const assert = (condition: boolean, message: string, quiet = false) => {
  if (!condition) {
    throw `❌ FAILED: ${message}`;
  }
  if (!quiet) {
    console.log(`✅ ${message}`);
  }
};
