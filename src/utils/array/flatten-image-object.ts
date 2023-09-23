export type ImageObject = { [key: number]: number | ImageObject };

export const flattenImageObject = (imageObj: ImageObject): number[] => {
  const flattenedArray: number[] = [];
  const visited: Set<ImageObject> = new Set();

  const traverseObject = (nestedObj: ImageObject) => {
    if (visited.has(nestedObj)) return;
    visited.add(nestedObj);

    for (const value of Object.values(nestedObj)) {
      if (typeof value === 'object') {
        traverseObject(value);
      } else {
        flattenedArray.push(value);
      }
    }
  };

  traverseObject(imageObj);
  return flattenedArray;
};
