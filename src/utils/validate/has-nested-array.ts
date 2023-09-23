export const isArrayWithNestedArrays = (arr: unknown): arr is unknown[][] => {
  if (!Array.isArray(arr)) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i])) {
      return false;
    }
  }

  return true;
};
