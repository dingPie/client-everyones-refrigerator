import { isArrayWithNestedArrays } from '@/utils/validate/has-nested-array';

describe('isArrayWithNestedArrays', () => {
  it('returns true for an array with nested arrays', () => {
    // Arrange
    const arr = [[1], [2], [3]];

    // Act
    const result = isArrayWithNestedArrays(arr);

    // Assert
    expect(result).toBe(true);
  });

  it('returns false for an array with non-array elements', () => {
    // Arrange
    const arr = [1, 2, 3];

    // Act
    const result = isArrayWithNestedArrays(arr);

    // Assert
    expect(result).toBe(false);
  });

  it('returns false for an empty array', () => {
    // Arrange
    const arr: unknown[] = [];

    // Act
    const result = isArrayWithNestedArrays(arr);

    // Assert
    expect(result).toBe(true);
  });

  it('returns false for an array with a non-array element', () => {
    // Arrange
    const arr = [[1], 2, [3]];

    // Act
    const result = isArrayWithNestedArrays(arr);

    // Assert
    expect(result).toBe(false);
  });
});
