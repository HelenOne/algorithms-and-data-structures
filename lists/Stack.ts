import { LinkedList, Node } from './LinkedList';

export class Stack<T> extends LinkedList<T> {

    public isEmpty(): boolean {
        return this.length === 0;
    }

    // добавить значение в стек
    public push(value: T) {
        this.add(value, this.length);
    }

    // убрать последнее добавленное значение из стека и вернуть его
    public pop(): T {
        if (this.lastNode === undefined) {
            throw new Error('Trying to get a value from empty stack');
        }
        const value = this.lastNode.value;
        this.remove(this.length - 1);
        return value;
    }

    // вернуть последнее добавленное значение из стека
    public getLast(): T {
        if (this.lastNode === undefined) {
            throw new Error('Trying to get a value from empty stack');
        }
        return this.lastNode.value;
    }
}