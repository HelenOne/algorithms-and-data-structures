import { Stack } from './Stack';

describe('Stack class', () => {
    it('should allow to add new items', () => {
        const stack = new Stack<number>();
        stack.push(1);
        expect(stack.getLast()).toBe(1);
        stack.push(2);
        expect(stack.getLast()).toBe(2);
    });
    it('should allow to remove items', () => {
        const stack = new Stack<number>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        stack.pop();
        stack.pop();
        expect(stack.getLast()).toBe(2);
    });
    it('should return a value on pop', () => {
        const stack = new Stack<number>();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
    });
    it('should know if it is empty', () => {
        const stack = new Stack<number>();
        expect(stack.isEmpty()).toBe(true);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        stack.pop();
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        stack.pop();
        expect(stack.isEmpty()).toBe(true);
    });
    it('should throw on illegal operations', () => {
        const stack = new Stack<number>();
        expect(stack.pop).toThrowError();
        stack.push(1);
        stack.pop();
        expect(stack.getLast).toThrowError();
    });
});