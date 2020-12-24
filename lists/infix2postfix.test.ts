import { infix2postfix } from './infix2postfix';

describe('Reverse Polish notation', () => {
  it('should handle simple plus expression', () => {
    expect(infix2postfix('1 + 1')).toBe('1 1 +');
  });
  it('should handle complex expression', () => {
    expect(infix2postfix('x ^ y / ( 5 * z ) + 10')).toBe('x y ^ 5 z * / 10 +');
  });
  it('should handle wikipedia example', () => {
    expect(infix2postfix('3 + 4 * 2 / ( 1 - 5 ) ^ 2')).toBe('3 4 2 * 1 5 - 2 ^ / +');
  });
  it('should handle different types of brackets', () => {
    expect(infix2postfix('x ^ y / [ ( 5 * z ) + 10 ]')).toBe('x y ^ 5 z * 10 + /');
  });
});
