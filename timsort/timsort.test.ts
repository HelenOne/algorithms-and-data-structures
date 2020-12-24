import { timsort } from './timsort';

describe('timsort dev', () => {
  it('should do not fail on empty array', () => {
    expect(timsort([])).toEqual([]);
  });
  it('should change nothing on single item array', () => {
    expect(timsort([1])).toEqual([1]);
  });
  it('should sort 2 items', () => {
    expect(timsort([1, 0])).toEqual([0, 1]);
  });
  it('should do not fail on invalid input', () => {
    (timsort as any)();
    (timsort as any)(['Hello', 'World']);
    (timsort as any)(['Hello', 'World', 1 / 0, null, Math.pow]);
  });
  it('should sort numbers', () => {
    expect(timsort([5, 3, 7, 9, 873, 10, 23])).toEqual([3, 5, 7, 9, 10, 23, 873]);
  });
  it('should sort negative numbers', () => {
    expect(timsort([5, 3, 7, -9, 873, -10, 23])).toEqual([-10, -9, 3, 5, 7, 23, 873]);
  });
  it('should do not change sorted numbers', () => {
    expect(timsort([-10, -9, 3, 5, 7, 23, 873])).toEqual([-10, -9, 3, 5, 7, 23, 873]);
  });
});