import { LinkedList } from './LinkedList';

describe('List class', () => {
    it('should allow to add items', () => {
        const list = new LinkedList();

        list.add(0, 0);
        list.add(10, 1);
        list.add(20, 2);

        expect(list.get(0)).toBe(0);
        expect(list.get(1)).toBe(10);
        expect(list.get(2)).toBe(20);
    });
    it('should allow to remove items', () => {
        const list = new LinkedList();

        list.add(0, 0);
        list.add(10, 1);
        list.add(20, 2);

        list.remove(1);

        expect(list.get(0)).toBe(0);
        expect(list.get(1)).toBe(20);
        expect(list.length).toBe(2);
    });
    it('should allow to add & remove items', () => {
        const list = new LinkedList();

        list.add(0, 0);
        list.add(10, 1);
        list.add(20, 2);

        list.remove(1);

        list.add(30, 2);

        list.remove(0);

        list.add(0, 0);

        list.remove(0);

        list.add(0, 0);

        list.add(40, 3);

        list.add(-10, 0);

        expect(list.get(0)).toBe(-10);
        expect(list.get(1)).toBe(0);
        expect(list.get(2)).toBe(20);
        expect(list.get(3)).toBe(30);
        expect(list.get(4)).toBe(40);
        expect(list.length).toBe(5);
    });
    it('should throw on illegal operations', () => {
        const list = new LinkedList();

        expect(() => list.get(0)).toThrowError();

        list.add('payload', 0);
        list.get(0);

        list.remove(0);
        expect(() => list.get(0)).toThrowError();

        expect(() => list.add('payload', 1)).toThrowError();
        list.add('payload', 0);
        list.add('payload', 1);
        expect(() => list.add('payload', 3)).toThrowError();
    });
});