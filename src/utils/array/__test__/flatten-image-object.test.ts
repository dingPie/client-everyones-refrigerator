import { ImageObject, flattenImageObject } from '../flatten-image-object';

describe('flattenImageObject', () => {
  it('returns a flat array of numbers from the given image object', () => {
    const imageObj: ImageObject = {
      1: [2, 3],
      2: {
        3: [4, 5],
        4: [6, 7],
      },
      5: 8,
    };
    const expectedResult = [2, 3, 4, 5, 6, 7, 8];

    const result = flattenImageObject(imageObj);

    expect(result).toEqual(expectedResult);
  });

  it('returns an empty array if the given image object is empty', () => {
    const imageObj: ImageObject = {};

    const result = flattenImageObject(imageObj);

    expect(result).toEqual([]);
  });

  it('returns an empty array if the given image object has no numbers', () => {
    const imageObj: ImageObject = {
      1: [],
      2: {
        3: [],
        4: [],
      },
    };

    const result = flattenImageObject(imageObj);

    expect(result).toEqual([]);
  });
});
